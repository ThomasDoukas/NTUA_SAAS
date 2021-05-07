import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { User } from './users/entities/user.entity';
import { Label } from './questions/entities/label.entity';
import { Answer } from './questions/entities/answer.entity';
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
    TypeOrmModule.forRoot({
        ...defaultOptions,
        name: 'usersConnection',
        database: 'saas_dummy_users',
        // entities: ["dist/**/*.entity{.ts,.js}"]
        entities: [User]
    }),
    TypeOrmModule.forRoot({
        ...defaultOptions,
        name: 'questionsConnection',
        database: 'saas_dummy_questions',
        entities: [Question, Label, Answer]
        // entities: ["dist/**/*.entity{.ts,.js}"] 
    }),
    // ConfigModule.forRoot({
    //     isGlobal: true,
    //     envFilePath: '../envFiles/.env',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
