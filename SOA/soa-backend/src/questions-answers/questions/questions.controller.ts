import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SearchQuestionDto } from './dto/search-question.dto';
import { JwtAuthGuard } from 'src/authentication/auth/guards/jwt-auth.guard';

@Controller('saas/soa/questions/')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    // Create question
    @UseGuards(JwtAuthGuard)
    @Post()
    createQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @Request() req
    ) {
        return this.questionsService.createQuestion(createQuestionDto, req.user);
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

    // Update question
    @UseGuards(JwtAuthGuard)
    @Patch(':questionId')
    updateQuestion(
        @Param('questionId') questionId: number,
        @Body() updateQuestionDto: UpdateQuestionDto,
        @Request() res
    ) {
        return this.questionsService.updateQuestion(questionId, updateQuestionDto, res.user);
    }

    // Delete question
    @UseGuards(JwtAuthGuard)
    @Delete(':questionId')
    removeQuestion(
        @Param('questionId') questionId: number,
        @Request() req
        ) {
        return this.questionsService.removeQuestion(questionId, req.user);
    }

}
