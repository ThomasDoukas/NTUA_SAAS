import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SearchQuestionDto } from './dto/search-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Controller('saas/microservices/browse/analytics')
export class AppController {
    constructor(private readonly appService: AppService) { }
    
    @MessagePattern({cmd: 'create_question'})
    createQuestion(payload: CreateQuestionDto): Promise<Question>{
        return this.appService.createQuestion(payload);
    }

    @MessagePattern({cmd: 'update_question'})
    updateQuestion(payload: UpdateQuestionDto): Promise<Question>{
        return this.appService.updateQuestion(payload);
    }

    @MessagePattern({cmd: 'delete_question'})
    deleteQuestion(payload: number): Promise<any>{
        return this.appService.deleteQuestion(payload);
    }

    @MessagePattern({cmd: 'create_answer'})
    createAnswer(payload: CreateAnswerDto): Promise<Answer>{
        return this.appService.createAnswer(payload);
    }

    @MessagePattern({cmd: 'update_answer'})
    updateAnswer(payload: UpdateAnswerDto): Promise<Answer>{
        return this.appService.updateAnswer(payload);
    }

    @MessagePattern({cmd: 'delete_answer'})
    deleteAnswer(payload: number): Promise<any>{
        return this.appService.deleteAnswer(payload);
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

    // // Search Questions
    // @Post('/search')
    // searchQuestions(@Body() searchQuestionDto: SearchQuestionDto) {
    //     return this.questionsService.searchQuestions(searchQuestionDto);
    // }

    // Get Daily Contribution for Statistics
    @Post('/myContr')
    findDailyContribution(@Body() searchQuestionDto: SearchQuestionDto) {
        return this.appService.findDailyContribution(searchQuestionDto);
    }

    // Find all labels DO NOT NEED THIS
    // @Get('/getLabels')
    // findAllLabels() {
    //     return this.questionsService.findAllLabels();
    // }

    // // Get Users Questions DO NOT NEED THIS, CAN BE REPLACED BY CUSTOM SEARCH
    // @UseGuards(JwtAuthGuard)
    // @Post('/userQuestions')
    // findUserQuestions(
    //     @Body() searchQuestionDto: SearchQuestionDto,
    //     @Request() req
    // ) {
    //     return this.questionsService.findUserQuestions(searchQuestionDto, req.user);
    // }

    // Get Label Questions for Statistics
    @Get('/labelQuestions')
    findLabelQuestions() {
        return this.appService.findLabelQuestions();
    }

    // Get Date Questions for Statistics
    @Post('/dateQuestions')
    findDateQuestions(@Body() searchQuestionDto: SearchQuestionDto) {
        return this.appService.findDateQuestions(searchQuestionDto);
    }

    // // Find single question
    // @Get(':questionId')
    // findOneQuestion(@Param('questionId') questionId: number) {
    //     return this.questionsService.findOneQuestion(questionId);
    // }

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
