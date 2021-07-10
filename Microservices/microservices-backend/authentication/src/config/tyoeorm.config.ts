import { TypeOrmModuleOptions } from "@nestjs/typeorm";
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
    name: 'msAuthenticationUsersConnection',
    database: process.env.DATABASE_NAME || 'saas_ms_auth_users',
    synchronize: true,
    entities: [User]
}