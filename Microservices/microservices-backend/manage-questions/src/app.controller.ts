import { Body, Controller, Get, Post, UseGuards, Request, Patch, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('saas/microservices/manageQuestions/')
export class AppController {
    constructor(private readonly appService: AppService) { }

    // Create question
    @UseGuards(JwtAuthGuard)
    @Post()
    createQuestion(
        @Body() createQuestionDto: CreateQuestionDto,
        @Request() req
    ) {
        return this.appService.createQuestion(createQuestionDto, req.user);
    }

    // Update question
    @UseGuards(JwtAuthGuard)
    @Patch(':questionId')
    updateQuestion(
        @Param('questionId') questionId: number,
        @Body() updateQuestionDto: UpdateQuestionDto,
        @Request() res
    ) {
        return this.appService.updateQuestion(questionId, updateQuestionDto, res.user);
    }

    // Delete question
    @UseGuards(JwtAuthGuard)
    @Delete(':questionId')
    removeQuestion(
        @Param('questionId') questionId: number,
        @Request() req
    ) {
        return this.appService.removeQuestion(questionId, req.user);
    }
}
