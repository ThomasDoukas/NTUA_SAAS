import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Label } from "src/entites/label.entity";
import { Question } from "src/entites/question.entity";
import { User } from "src/entites/user.entity";

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
    name: 'msManageQuestionsUsersConnection',
    database: process.env.DATABASE_NAME || 'saas_ms_manage_questions_users',
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
    name: 'msManageQuestionsQuestionsConnection',
    database: process.env.DATABASE_NAME || 'saas_ms_manage_questions_questions',
    synchronize: true,
    entities: [Question, Label]
}