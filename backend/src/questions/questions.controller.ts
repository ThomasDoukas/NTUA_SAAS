import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SearchQuestionDto } from './dto/search-question.dto';

@Controller('saas/architecture/questions/')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    // Create question
    @Post()
    createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionsService.createQuestion(createQuestionDto);
    }

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

    // Get Daily Contribution for Statistics
    @Post('/myContr')
    findDailyContribution(@Body() searchQuestionDto: SearchQuestionDto){
        return this.questionsService.findDailyContribution(searchQuestionDto);
    }

    // Find all labels DO NOT NEED THIS
    // @Get('/getLabels')
    // findAllLabels() {
    //     return this.questionsService.findAllLabels();
    // }

    // Get Users Questions
    @Post('/userQuestions')
    findUserQuestions(@Body() searchQuestionDto: SearchQuestionDto){
        return this.questionsService.findUserQuestions(searchQuestionDto);
    }

    // Get Label Questions for Statistics
    @Get('/labelQuestions')
    findLabelQuestions(){
        return this.questionsService.findLabelQuestions();
    }

    // Get Date Questions for Statistics
    @Get('/dateQuestions')
    findDateQuestions(@Body() searchQuestionDto: SearchQuestionDto){
        return this.questionsService.findDateQuestions(searchQuestionDto);
    }

    // Find single question
    @Get(':questionId')
    findOneQuestion(@Param('questionId') questionId: number) {
        return this.questionsService.findOneQuestion(questionId);
    }

    // Update question 
    @Patch(':questionId')
    updateQuestion(@Param('questionId') questionId: number, @Body() updateQuestionDto: UpdateQuestionDto) {
        return this.questionsService.updateQuestion(questionId, updateQuestionDto);
    }

    // Delete question
    @Delete(':questionId')
    removeQuestion(@Param('questionId') questionId: number) {
        return this.questionsService.removeQuestion(questionId);
    }

}
