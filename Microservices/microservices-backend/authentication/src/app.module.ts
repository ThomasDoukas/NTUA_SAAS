import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const defaultOptions = {
    type: 'postgres' as 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    synchronize: true,
};

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' }
        }),
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msAuthenticationUsersConnection',
            database: 'saas_ms_auth_users',
            entities: [User],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, LocalStrategy]
})
export class AppModule { }
