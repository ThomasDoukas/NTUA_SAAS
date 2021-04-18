import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) {}
    
    // auth.strategy, auth.service, users.service, login
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req): Promise<{access_token: string}> {
        return this.authService.login(req.user);
    }

    @Post('auth/signup')
    createUser(@Body() createUserDto: CreateUserDto): Promise<{access_token: string}> {
        return this.authService.signup(createUserDto);
    }
}