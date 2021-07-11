import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtStrategy } from './strategies/jwt.strategy';
import { typeOrmUsersConfig } from './config/tyoeorm.config';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '6000s' }
        }),
        TypeOrmModule.forRoot(typeOrmUsersConfig),
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
