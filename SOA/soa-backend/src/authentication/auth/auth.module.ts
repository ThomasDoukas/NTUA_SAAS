import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/authentication/users/users.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'saasSecretKey',
            signOptions: {expiresIn: '6000s'}
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, UsersService],
    exports: [AuthService]
    
})
export class AuthModule {}
