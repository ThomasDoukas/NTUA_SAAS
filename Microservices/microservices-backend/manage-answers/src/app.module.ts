import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmQuestionsConfig, typeOrmUsersConfig } from './config/tyoeorm.config';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { User } from './entities/user.entity';
import { QuestionsModule } from './questions/questions.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './users/users.module';

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
        QuestionsModule,
        UsersModule,
        TypeOrmModule.forRoot(
            typeOrmUsersConfig
            // {
            //     ...defaultOptions,
            //     name: 'msManageAnswersUsersConnection',
            //     database: 'saas_ms_manage_answers_users',
            //     entities: [User],
            // }
        ),
        TypeOrmModule.forRoot(
            typeOrmQuestionsConfig
            // {
            //     ...defaultOptions,
            //     name: 'msManageAnswersQuestionsConnection',
            //     database: 'saas_ms_manage_answers_questions',
            //     entities: [Question, Answer],
            // }
        ),
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
