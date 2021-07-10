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

    // // Create question
    // @UseGuards(JwtAuthGuard)
    // @Post()
    // createQuestion(
    //     @Body() createQuestionDto: CreateQuestionDto,
    //     @Request() req
    // ) {
    //     return this.questionsService.createQuestion(createQuestionDto, req.user);
    // }

    // // Find all questions REPLACED BY Search Questions
    // @Get()
    // findAllQuestions() {
    //     return this.questionsService.findAllQuestions();
    // }

    // Search Questions
    @Post('/search')
    searchQuestions(@Body() searchQuestionDto: SearchQuestionDto) {
        return this.questionsService.searchQuestions(searchQuestionDto);
    }

    // // Get Daily Contribution for Statistics
    // @Post('/myContr')
    // findDailyContribution(@Body() searchQuestionDto: SearchQuestionDto){
    //     return this.questionsService.findDailyContribution(searchQuestionDto);
    // }

    // Find all labels DO NOT NEED THIS
    // @Get('/getLabels')
    // findAllLabels() {
    //     return this.questionsService.findAllLabels();
    // }

    // Get Users Questions DO NOT NEED THIS, CAN BE REPLACED BY CUSTOM SEARCH
    @UseGuards(JwtAuthGuard)
    @Post('/usersQuestions')
    findUserQuestions(
        @Body() searchQuestionDto: SearchQuestionDto,
        @Request() req
    ) {
        return this.questionsService.findUserQuestions(searchQuestionDto, req.user);
    }

    // // Get Label Questions for Statistics
    // @Get('/labelQuestions')
    // findLabelQuestions(){
    //     return this.questionsService.findLabelQuestions();
    // }

    // // Get Date Questions for Statistics
    // @Post('/dateQuestions')
    // findDateQuestions(@Body() searchQuestionDto: SearchQuestionDto){
    //     return this.questionsService.findDateQuestions(searchQuestionDto);
    // }

    // Find single question
    @Get(':questionId')
    findOneQuestion(@Param('questionId') questionId: number) {
        return this.questionsService.findOneQuestion(questionId);
    }

    // // Update question
    // @UseGuards(JwtAuthGuard)
    // @Patch(':questionId')
    // updateQuestion(
    //     @Param('questionId') questionId: number,
    //     @Body() updateQuestionDto: UpdateQuestionDto,
    //     @Request() res
    // ) {
    //     return this.questionsService.updateQuestion(questionId, updateQuestionDto, res.user);
    // }

    // // Delete question
    // @UseGuards(JwtAuthGuard)
    // @Delete(':questionId')
    // removeQuestion(
    //     @Param('questionId') questionId: number,
    //     @Request() req
    //     ) {
    //     return this.questionsService.removeQuestion(questionId, req.user);
    // }
}
