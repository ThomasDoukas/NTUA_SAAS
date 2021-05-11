import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) {}
    
    // Login
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req): Promise<{access_token: string}> {
        // console.log('Third! login in auth.controller.ts');
        return this.authService.login(req.user);
    }

    // Create new user
    @Post('auth/signup')
    createUser(@Body() createUserDto: CreateUserDto): Promise<{access_token: string}> {
        return this.authService.signup(createUserDto);
    }
}