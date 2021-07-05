import { Body, Controller, Get, Post, UseGuards, Request, Patch, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('saas/microservices/manageQuestion/')
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

    // // Get Users Questions DO NOT NEED THIS, CAN BE REPLACED BY CUSTOM SEARCH
    // @UseGuards(JwtAuthGuard)
    // @Post('/userQuestions')
    // findUserQuestions(
    //     @Body() searchQuestionDto: SearchQuestionDto,
    //     @Request() req
    // ) {
    //     return this.appService.findUserQuestions(searchQuestionDto, req.user);
    // }

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

    // // Find single question
    // @Get(':questionId')
    // findOneQuestion(@Param('questionId') questionId: number) {
    //     return this.appService.findOneQuestion(questionId);
    // }

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
