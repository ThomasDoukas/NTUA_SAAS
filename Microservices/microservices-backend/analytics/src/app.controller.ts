import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ContributionDto } from './dto/contribution.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { JwtAuthGuard } from './users/guards/jwt-auth.guard';

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

    // Get Daily Contribution for Statistics
    @UseGuards(JwtAuthGuard)
    @Post('/myContr')
    findDailyContribution(
        @Body() contributionDto: ContributionDto,
        @Request() req) {
        return this.appService.findDailyContribution(contributionDto, req.user);
    }

    // Get Label Questions for Statistics
    @Get('/labelQuestions')
    findLabelQuestions() {
        return this.appService.findLabelQuestions();
    }

    // Get Date Questions for Statistics
    @Post('/dateQuestions')
    findDateQuestions(@Body() contributionDto: ContributionDto) {
        return this.appService.findDateQuestions(contributionDto);
    }

}
