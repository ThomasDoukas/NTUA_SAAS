import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
        // type: process.env.DB_TYPE as any,
        // host: process.env.DB_HOST,
        // port: parseInt(process.env.DB_PORT),
        // username: process.env.USERNAME,
        // password: process.env.PASSWORD,
        // database: process.env.DATABASE,
        // autoLoadEntities: true,
        // synchronize: true,
    }),
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
