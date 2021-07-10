import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtStrategy } from './strategies/jwt.strategy';
import { typeOrmUsersConfig } from './config/tyoeorm.config';

require('dotenv').config();

// const defaultOptions = {
//     type: 'postgres' as 'postgres',
//     port: 5432,
//     username: 'postgres',
//     password: process.env.DATABASE_PASSWORD,
//     host: 'localhost',
//     synchronize: true,
// };

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '6000s' }
        }),
        TypeOrmModule.forRoot(
            typeOrmUsersConfig
            // {
            // ...defaultOptions,
            // name: 'msAuthenticationUsersConnection',
            // database: 'saas_ms_auth_users',
            // entities: [User],
            // }
        ),
        ClientsModule.register([
            {
                name: "AUTHENTICATE",
                transport: Transport.REDIS,
                options: {
                    url: process.env.REDIS_URL,
                    password: process.env.REDIS_PASSWORD
                }
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppService, LocalStrategy, JwtStrategy]
})
export class AppModule { }
