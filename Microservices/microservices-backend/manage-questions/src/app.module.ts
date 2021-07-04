import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Label } from './entites/label.entity';
import { Question } from './entites/question.entity';
import { User } from './entites/user.entity';
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
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageQuestionsUsersConnection',
            database: 'saas_ms_manageQuestions_users',
            entities: [User],
        }),
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageQuestionsQuestionsConnection',
            database: 'saas_ms_manageQuestions_questions',
            entities: [Question, Label],
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
