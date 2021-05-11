import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            // secret: process.env.JWT_SECRET,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '600s'}
        }),
    ],
    controllers: [AuthController],
    // providers: [AuthService, LocalStrategy, JwtStrategy],
    providers: [AuthService, LocalStrategy, UsersService],
    exports: [AuthService]
    
})
export class AuthModule {}
