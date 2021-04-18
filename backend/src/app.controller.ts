// import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
// import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/guards/local-auth.guard';
// import { UsersService } from './users/users.service';

// @Controller()
// export class AppController {

//     constructor(
//         private authService: AuthService,
//         private usersService: UsersService
//     ) {}
    
//     @UseGuards(LocalAuthGuard)
//     @Post('auth/login')
//     async login(@Request() req) {
//         return this.authService.login(req.user);
//     }

//     @UseGuards(JwtAuthGuard)
//     @Post('saas/architecture/users')
//     createUser(@Request() req){
//         console.log(req);
//         return this.usersService.createUser(req.body);
//     }
// }

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}