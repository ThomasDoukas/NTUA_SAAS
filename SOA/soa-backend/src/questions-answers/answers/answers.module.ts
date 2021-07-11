import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { UsersService } from 'src/authentication/users/users.service';
import { QuestionsService } from 'src/questions-answers/questions/questions.service';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, UsersService, QuestionsService],
  exports: [AnswersService]
})
export class AnswersModule {}
