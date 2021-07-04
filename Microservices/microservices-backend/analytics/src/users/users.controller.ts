import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // // Create new user
    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.createUser(createUserDto);
    // }

    // // Find all users
    // @Get()
    // findAllUsers() {
    //     return this.usersService.findAllUsers();
    // }

    // // Find single user
    // @Get(':userId')
    // findOneUser(@Param('userId') userId: number) {
    //     return this.usersService.findOneUser(userId);
    // }

    // // Update user
    // @UseGuards(JwtAuthGuard)
    // @Patch(':userId')
    // updateUser(
    //     @Param('userId') userId: number,
    //     @Body() updateUserDto: UpdateUserDto,
    //     @Request() req
    // ) {
    //     if (userId != req.user.userId) throw new ConflictException('userId does not match jwt.userId')
    //     return this.usersService.updateUser(req.user.userId, updateUserDto);
    // }

    // // Delete user
    // @UseGuards(JwtAuthGuard)
    // @Delete(':userId')
    // removeUser(
    //     @Param('userId') userId: number,
    //     @Request() req
    // ) {
    //     // console.log(req.headers);

    //     // console.log(userId);
    //     // console.log(req.user.userId);

    //     if (userId != req.user.userId) throw new ConflictException('userId does not match jwt.userId')
    //     return this.usersService.removeUser(req.user.userId);
    // }

}
