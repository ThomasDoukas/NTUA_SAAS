import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './authentication/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authentication/auth/auth.module';
import { QuestionsModule } from './questions-answers/questions/questions.module';
import { AnswersModule } from './questions-answers/answers/answers.module';
import { EsbModule } from './esb/esb.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { typeOrmUsersConfig, typeOrmQuestionsConfig } from './config/typeorm.config'


@Module({
    imports: [
        UsersModule,
        AuthModule,
        QuestionsModule,
        AnswersModule,
        AnalyticsModule,
        EsbModule,
        TypeOrmModule.forRoot(typeOrmUsersConfig),
        TypeOrmModule.forRoot(typeOrmQuestionsConfig)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
