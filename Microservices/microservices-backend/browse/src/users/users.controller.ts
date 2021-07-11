import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('saas/microservices/browse/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({cmd: 'create_user'})
    createUser(payload: CreateUserDto): Promise<User>{
        return this.usersService.createUser(payload);
    }

    @MessagePattern({cmd: 'update_user'})
    updateUser(payload: UpdateUserDto): Promise<User>{        
        return this.usersService.updateUser(payload);
    }

    @MessagePattern({cmd: 'delete_user'})
    removeUser(payload: number): Promise<any>{
        return this.usersService.removeUser(payload);
    }

    // Find single user
    @Get(':userId')
    findOneUser(@Param('userId') userId: number) {
        return this.usersService.findOneUser(userId);
    }

}
