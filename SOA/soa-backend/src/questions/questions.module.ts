import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { UsersService } from 'src/users/users.service';

@Module({
    controllers: [QuestionsController],
    providers: [QuestionsService, UsersService],
    exports: [QuestionsService]
})
export class QuestionsModule { }
