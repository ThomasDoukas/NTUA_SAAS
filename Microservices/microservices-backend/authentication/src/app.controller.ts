import { Controller, Post, UseGuards, Request, Body, Patch, Get, Param, Delete, ConflictException } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('saas/microservices/authentication/')
export class AppController {
    constructor(private readonly appService: AppService) { }

    // Create new user
    @Post('/signup')
    signup(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }> {
        return this.appService.signup(createUserDto);
    }

    // User login
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): Promise<{ access_token: string }> {
        // console.log('Third! login in auth.controller.ts');
        return this.appService.login(req.user);
    }

    // Find all users WE DO NOT NEED THIS
    @Get()
    findAllUsers() {
        return this.appService.findAllUsers();
    }

    // Find single user
    @Get(':userId')
    findOneUser(@Param('userId') userId: number) {
        return this.appService.findOneUser(userId);
    }

    // Update user
    @UseGuards(JwtAuthGuard)
    @Patch(':userId')
    updateUser(
        @Param('userId') userId: number,
        @Body() updateUserDto: UpdateUserDto,
        @Request() req
    ) {
        if (userId != req.user.userId) throw new ConflictException('userId does not match jwt.userId')
        return this.appService.updateUser(req.user.userId, updateUserDto);
    }

    // Delete user
    @UseGuards(JwtAuthGuard)
    @Delete(':userId')
    removeUser(
        @Param('userId') userId: number,
        @Request() req
    ) {
        if (userId != req.user.userId) throw new ConflictException('userId does not match jwt.userId')
        return this.appService.removeUser(req.user.userId);
    }
}
