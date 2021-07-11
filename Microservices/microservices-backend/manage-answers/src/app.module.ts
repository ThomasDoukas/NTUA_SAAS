import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmQuestionsConfig, typeOrmUsersConfig } from './config/tyoeorm.config';
import { QuestionsModule } from './questions/questions.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        QuestionsModule,
        UsersModule,
        TypeOrmModule.forRoot(typeOrmUsersConfig),
        TypeOrmModule.forRoot(typeOrmQuestionsConfig),
        ClientsModule.register([
            {
                name: 'MANAGE_ANSWERS',
                transport: Transport.REDIS,
                options: {
                    url: process.env.REDIS_URL,
                    password: process.env.REDIS_PASSWORD
                }
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule { }
