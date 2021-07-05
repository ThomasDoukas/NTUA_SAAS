import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Answer } from './dto/answer.entity';
import { Question } from './dto/question.entity';
import { User } from './dto/user.entity';
import { QuestionsModule } from './questions/questions.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './users/users.module';

require('dotenv').config();

const defaultOptions = {
    type: 'postgres' as 'postgres',
    port: 5432,
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    host: 'localhost',
    synchronize: true,
};

@Module({
    imports: [
        QuestionsModule,
        UsersModule,
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageAnswersUsersConnection',
            database: 'saas_ms_manage_answers_users',
            entities: [User],
        }),
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageAnswersQuestionsConnection',
            database: 'saas_ms_manage_answers_questions',
            entities: [Question, Answer],
        })
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule { }
