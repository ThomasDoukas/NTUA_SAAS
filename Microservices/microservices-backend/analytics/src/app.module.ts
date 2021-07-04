import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Question } from './entities/question.entity';
import { Label } from './entities/label.entity';

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
		TypeOrmModule.forRoot({
			...defaultOptions,
			name: 'msAnalyticsUsersConnection',
			database: 'saas_ms_analytics_users',
			entities: [User],
		}),
		TypeOrmModule.forRoot({
			...defaultOptions,
			name: 'mAnalyticsQuestionsConnection',
			database: 'saas_ms_analytics_questions',
			entities: [Question, Label, Answer],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
