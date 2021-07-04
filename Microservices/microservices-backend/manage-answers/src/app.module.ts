import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Answer } from './dto/answer.entity';
import { Question } from './dto/question.entity';
import { User } from './dto/user.entity';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

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
        QuestionsModule,
        UsersModule,
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageAnswersUsersConnection',
            database: 'saas_ms_manageAnswers_users',
            entities: [User],
        }),
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageAnswersQuestionsConnection',
            database: 'saas_ms_manageAnswers_questions',
            entities: [Question, Answer],
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
