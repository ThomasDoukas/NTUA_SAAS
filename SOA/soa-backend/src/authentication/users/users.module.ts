import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User], 'usersConnection')],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    exports: [UsersService]
})
export class UsersModule { }
