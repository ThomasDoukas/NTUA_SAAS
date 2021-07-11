import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { JwtStrategy } from './users/strategies/strategies';
import { typeOrmQuestionsConfig, typeOrmUsersConfig } from './config/tyoeorm.config';

@Module({
    imports: [
        UsersModule,
        QuestionsModule,
        AnswersModule,
        TypeOrmModule.forRoot(typeOrmUsersConfig),
        TypeOrmModule.forRoot(typeOrmQuestionsConfig),
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule { }
