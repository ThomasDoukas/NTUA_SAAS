import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/authentication/users/dto/create-user.dto';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) {}
    
    // Login
    @UseGuards(LocalAuthGuard)
    @Post('saas/soa/auth/login')
    login(@Request() req): Promise<{access_token: string}> {    
        // console.log('Third! login in auth.controller.ts');
        return this.authService.login(req.user);
    }

    // Create new user
    @Post('saas/soa/auth/signup')
    signup(@Body() createUserDto: CreateUserDto): Promise<{access_token: string}> {
        return this.authService.signup(createUserDto);
    }
}