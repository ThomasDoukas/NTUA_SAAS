import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Answer } from "src/answers/entities/answer.entity";
import { Label } from "src/questions/entities/label.entity";
import { Question } from "src/questions/entities/question.entity";
import { User } from "src/users/entities/user.entity";

export const typeOrmUsersConfig: TypeOrmModuleOptions = {
    ssl: process.env.PROD=='false' ? false: true || false,
    extra: {
        ssl: process.env.PROD ? {rejectUnauthorized: false} : null
    },
    type: 'postgres',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    host: process.env.DATABASE_HOST || 'localhost',
    name: 'usersConnection',
    database: process.env.DATABASE_NAME || 'saas_dummy_users',
    synchronize: true,
    entities: [User]
}

export const typeOrmQuestionsConfig: TypeOrmModuleOptions = {
    ssl: process.env.PROD=='false' ? false: true || false,
    extra: {
        ssl: process.env.PROD ? {rejectUnauthorized: false} : null
    },
    type: 'postgres',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    host: process.env.DATABASE_HOST || 'localhost',
    name: 'questionsConnection',
    database: process.env.DATABASE_NAME || 'saas_dummy_questions',
    synchronize: true,
    entities: [Question, Label, Answer]
}