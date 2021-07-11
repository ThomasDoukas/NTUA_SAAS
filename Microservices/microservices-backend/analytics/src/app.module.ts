import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtStrategy } from './users/strategies/jwt.strategy';
import { typeOrmQuestionsConfig, typeOrmUsersConfig } from './config/tyoeorm.config';

@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forRoot(typeOrmUsersConfig),
		TypeOrmModule.forRoot(typeOrmQuestionsConfig),
	],
	controllers: [AppController],
	providers: [AppService, JwtStrategy],
})
export class AppModule { }
