import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { User } from './users/entities/user.entity';
import { Question } from './questions/entities/question.entity';
import { Label } from './questions/entities/label.entity';
import { Answer } from './answers/entities/answer.entity';

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
        UsersModule,
        QuestionsModule,
        AnswersModule,
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msBrowseUsersConnection',
            database: 'saas_ms_browse_users',
            entities: [User],
        }),
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msBrowseQuestionsConnection',
            database: 'saas_ms_browse_questions',
            entities: [Question, Label, Answer],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
