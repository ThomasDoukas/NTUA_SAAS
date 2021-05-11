import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { User } from './users/entities/user.entity';
import { Label } from './questions/entities/label.entity';
import { Answer } from './answers/entities/answer.entity';
import { Question } from './questions/entities/question.entity';

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
    AuthModule,
    QuestionsModule,
    AnswersModule,
    TypeOrmModule.forRoot({
        ...defaultOptions,
        name: 'usersConnection',
        database: 'saas_dummy_users',
        entities: [User],
        // migrationsTableName: 'users_migration_table',
        // migrations: ['dist/migration/users/*{.ts,.js}'],
        // cli: {
        //     'migrationsDir': 'dist/migration/users'
        // }
    }),
    TypeOrmModule.forRoot({
        ...defaultOptions,
        name: 'questionsConnection',
        database: 'saas_dummy_questions',
        entities: [Question, Label, Answer],
        // migrationsTableName: 'questions_migration_table',
        // migrations: ['dist/migration/questions/*{.ts,.js}'],
        // cli: {
        //     'migrationsDir': 'dist/migration/questions'
        // }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
