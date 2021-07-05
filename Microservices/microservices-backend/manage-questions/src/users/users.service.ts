import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectEntityManager('msManageQuestionsUsersConnection') private manager: EntityManager) { }

    // Use email to find user
    async findUserFromEmail(email: string): Promise<User> {
        const userExists = await this.manager.findOne(User, { where: { email: email } });
        if (!userExists) throw new NotFoundException(`User not found`);
        return userExists;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.manager.create(User, createUserDto);
        return await this.manager.save(newUser);
    }

    async updateUser(payload): Promise<User> {
        // payload = {userId, ...updateUser}
        return this.manager.transaction(async manager => {
            const userExists = await manager.findOne(User, payload.userId);
            manager.merge(User, userExists, payload.updateUserDto)
            const res = await manager.save(userExists);
            return res;
        })
    }

    async removeUser(userId: number): Promise<any> {
        return await this.manager.delete(User, userId);
    }
}
