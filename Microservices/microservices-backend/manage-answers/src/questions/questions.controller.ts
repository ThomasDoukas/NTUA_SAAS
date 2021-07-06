import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Question } from 'src/entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    @MessagePattern({cmd: 'create_question'})
    createQuestion(payload: CreateQuestionDto): Promise<Question>{
        return this.questionsService.createQuestion(payload);
    }

    @MessagePattern({cmd: 'update_question'})
    updateQuestion(payload: UpdateQuestionDto): Promise<Question>{
        return this.questionsService.updateQuestion(payload);
    }
    
    @MessagePattern({cmd: 'update_question'})
    deleteQuestion(payload): Promise<Question>{
        return this.questionsService.deleteQuestion(payload)
    }
}
