import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Create new user
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // Probably don't need this
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    // Find single user
    @Get(':userId')
    findOne(@Param('userId') userId: number) {
        return this.usersService.findOne(userId);
    }

    // Update user
    @Patch(':userId')
    update(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(userId, updateUserDto);
    }

    // Delete user
    @Delete(':userId')
    removeUser(@Param('userId') userId: number) {
        return this.usersService.removeUser(userId);
    }
}
