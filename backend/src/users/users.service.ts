import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(@InjectEntityManager() private manager: EntityManager) { }

    // Create single user
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.manager.transaction( async manager => {
            const userExists = await manager.findOne(User, {where: {username: createUserDto.username }});
            if(userExists) throw new ConflictException(`Username ${createUserDto.username} already exists!`);
            const newUser = await this.manager.create(User, createUserDto);
            return this.manager.save(newUser);
        })
    }

    // Returns all users in database
    async findAll(): Promise<User[]> {
        return this.manager.find(User)
    }

    // Returns userId
    async findOne(userId: number): Promise<User> {
        const userExists = await this.manager.findOne(User, userId);
        if(!userExists) throw new NotFoundException(`User ${userId} not found!`);
        return userExists;
    }

    // Update user
    async update(userId: number, updateUserDto: UpdateUserDto) {
        return this.manager.transaction( async manager => {
            const userExists = await this.manager.findOne(User, userId);
            if(!userExists) throw new NotFoundException(`User ${userId} not found`);
            if(updateUserDto.username && updateUserDto.username !== userExists.username){
                const usernameExists = await this.manager.findOne(User, {where: {username: updateUserDto.username}});
                if(userExists) throw new ConflictException(`Username ${updateUserDto.username} already exists!`);
            }
            manager.merge(User, userExists, updateUserDto);
            return manager.save(userExists);
        })
    }

    // Delete user WHAT TYPE DOES THIS RETURN?????????
    async removeUser(userId: number): Promise<any> { 
        return this.manager.transaction( async manager => {
            const userExists = await manager.findOne(User, userId);
            if(!userExists) throw new NotFoundException(`User ${userId} not found!`);
            return await manager.delete(User, userId);
        })
    }
}
