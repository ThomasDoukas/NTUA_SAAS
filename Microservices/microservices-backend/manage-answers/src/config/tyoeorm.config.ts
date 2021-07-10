import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Answer } from "src/entities/answer.entity";
import { Question } from "src/entities/question.entity";
import { User } from "src/entities/user.entity";

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
    name: 'msManageAnswersUsersConnection',
    database: process.env.DATABASE_NAME || 'saas_ms_manage_answers_users',
    synchronize: true,
    entities: [User]
}

export const typeOrmQuestionsConfig: TypeOrmModuleOptions = {
    ssl: process.env.PROD=='false' ? false: true,
    extra: {
        ssl: process.env.PROD ? {rejectUnauthorized: false} : null
    },
    type: 'postgres',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    host: process.env.DATABASE_HOST || 'localhost',
    name: 'msManageAnswersQuestionsConnection',
    database: process.env.DATABASE_NAME || 'saas_ms_manage_answers_questions',
    synchronize: true,
    entities: [Question, Answer]
}