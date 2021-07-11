import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SearchQuestionDto } from './dto/search-question.dto';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';

@Controller('saas/microservices/browse/questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    @MessagePattern({cmd: 'create_question'})
    createQuestion(payload: CreateQuestionDto): Promise<Question>{
        return this.questionsService.createQuestion(payload);
    }

    @MessagePattern({cmd: 'update_question'})
    updateQuestion(payload): Promise<Question>{
        return this.questionsService.updateQuestion(payload)
    }

    @MessagePattern({cmd: 'delete_question'})
    deleteQuestion(payload): Promise<Question>{
        return this.questionsService.deleteQuestion(payload)
    }

    // Search Questions
    @Post('/search')
    searchQuestions(@Body() searchQuestionDto: SearchQuestionDto) {
        return this.questionsService.searchQuestions(searchQuestionDto);
    }

    // Get Users Questions
    @UseGuards(JwtAuthGuard)
    @Post('/usersQuestions')
    findUserQuestions(
        @Body() searchQuestionDto: SearchQuestionDto,
        @Request() req
    ) {
        return this.questionsService.findUserQuestions(searchQuestionDto, req.user);
    }

    // Find single question
    @Get(':questionId')
    findOneQuestion(@Param('questionId') questionId: number) {
        return this.questionsService.findOneQuestion(questionId);
    }

}
