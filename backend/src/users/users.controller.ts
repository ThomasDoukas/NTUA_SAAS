import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('saas/architecture/users/')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Create new user
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // Find all users
    @Get()
    findAllUsers() {
        return this.usersService.findAllUsers();
    }

    // Find single user
    @Get(':userId')
    findOneUser(@Param('userId') userId: number) {
        return this.usersService.findOneUser(userId);
    }

    // Update user
    @Patch(':userId')
    updateUser(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(userId, updateUserDto);
    }

    // Delete user
    @Delete(':userId')
    removeUser(@Param('userId') userId: number) {
        return this.usersService.removeUser(userId);
    }

}
