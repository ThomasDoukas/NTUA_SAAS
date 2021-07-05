import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';

const logger = new Logger('Authentication')

@Injectable()
export class AppService {
    constructor(
        @InjectEntityManager('msAuthenticationUsersConnection') private manager: EntityManager,
        @Inject('AUTHENTICATE') private client: ClientProxy,
        private jwtService: JwtService,
    ) { }

    // Remove findAllUsers

    // Retrieve the user and validate password
    // Should return a user object if validation is successfully (as described in local.strategy)
    async validateUser(email: string, pass: string): Promise<any> {
        // console.log('Second! validateUser in auth.service.ts');
        const userExists = await this.findUserFromEmail(email);
        const passwordIsValid = await bcrypt.compare(pass, userExists.password);
        if (userExists && passwordIsValid) {
            const { password, ...result } = userExists;
            return result;
        }
        else
            return null;
    }

    async login(user: any) {
        // console.log('Fourth! login in auth.service.ts');
        const credentials = { email: user.email, userId: user.userId };
        return {
            access_token: this.jwtService.sign(credentials), ...credentials
        };
    }

    async signup(user: any) {
        const newUser = await this.createUser(user);
        const credentials = { email: newUser.email, userId: newUser.userId };
        return { access_token: this.jwtService.sign(credentials), ...credentials };
    }

    // Create single user
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.manager.transaction(async manager => {
            const userExists = await manager.findOne(User, { where: { email: createUserDto.email } });
            if (userExists) throw new ConflictException(`Email ${createUserDto.email} already exists!`);
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const newUserDto = { ...createUserDto, password: hashedPassword };
            const newUser = await manager.create(User, newUserDto);
            const result = await manager.save(newUser);

            const pattern = {cmd: 'create_user' };
            try {
                const subscribeUser = await this.publishUsers(newUser, pattern);
                logger.log('Executing' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            return result;
        })
    }

    // Returns all users in database
    async findAllUsers(): Promise<User[]> {
        return await this.manager.find(User)
    }

    // Returns userId
    async findOneUser(userId: number): Promise<User> {
        const userExists = await this.manager.findOne(User, userId);
        if (!userExists) throw new NotFoundException(`User not found!`);
        return userExists;
    }

    // Update user
    async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        return this.manager.transaction(async manager => {
            const userExists = await manager.findOne(User, userId);
            if (!userExists) throw new NotFoundException(`User ${userId} not found`);
            // To update email
            if (updateUserDto.email && updateUserDto.email !== userExists.email) {
                // We need to know whether new mail is being used or not
                const emailUsed = await manager.findOne(User, { where: { email: updateUserDto.email } });
                if (emailUsed) throw new ConflictException(`Email ${updateUserDto.email} already being used!`);
            }
            manager.merge(User, userExists, updateUserDto);
            const result = await manager.save(userExists);

            const pattern = {cmd: 'update_user' };
            const payload = {updateUserDto, userId: userId}
            try {
                const subscribeUser = await this.publishUsers(payload, pattern);
                logger.log('Executing ' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            return result;
        })
    }

    // Delete user
    async removeUser(userId: number): Promise<any> {
        return this.manager.transaction(async manager => {
            const userExists = await manager.findOne(User, userId);
            if (!userExists) throw new NotFoundException(`User not found!`);
            const result = await manager.delete(User, userId);

            const pattern = {cmd: 'delete_user'};
            try {
                const subscribeUser = await this.publishUsers(userId, pattern);
                logger.log('Executing ' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            return result
        })
    }

    // Use email to find user
    async findUserFromEmail(email: string): Promise<User> {
        const userExists = await this.manager.findOne(User, { where: { email: email } });
        if (!userExists) throw new NotFoundException(`User not found`);
        return userExists;
    }

    // Publish users to redis (Create, Update, Delete)
    async publishUsers(payload, pattern) {
        const result = await this.client.send(pattern, payload);
        return result.toPromise();
    }
}
