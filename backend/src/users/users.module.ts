import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    exports: [UsersService]
})
export class UsersModule { }
