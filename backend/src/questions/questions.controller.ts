import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('saas/architecture/questions/')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    // Create question
    @Post()
    createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionsService.createQuestion(createQuestionDto);
    }

    // Find all questions
    @Get()
    findAllQuestions() {
        return this.questionsService.findAllQuestions();
    }

    // Find all questions
    @Get('/getlabels')
    findAllLabels() {
        return this.questionsService.findAllLabels();
    }

    @Get(':questionId')
    findOneQuestion(@Param('questionId') questionId: number) {
        return this.questionsService.findOneQuestion(questionId);
    }

    @Patch(':questionId')
    updateQuestion(@Param('questionId') questionId: number, @Body() updateQuestionDto: UpdateQuestionDto) {
        return this.questionsService.updateQuestion(questionId, updateQuestionDto);
    }

    // Delete question
    @Delete(':questionId')
    removeQuestion(@Param('questionId') questionId: number) {
        return this.questionsService.removeQuestion(questionId);
    }

    // // Delete label
    // @Delete('dellabels')
    // removeLabel(@Body('labelTitle') labelTitle: string[]) {
    //     return this.questionsService.removeLabel(labelTitle);
    // }
}
