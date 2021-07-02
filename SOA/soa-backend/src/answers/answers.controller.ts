import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('saas/soa/answers/')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }

    // Create answer
    @Post()
    createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
        return this.answersService.createAnswer(createAnswerDto);
    }

    // Find all answers
    @Get()
    findAllAnswers() {
        return this.answersService.findAllAnswers();
    }

    // Find users answers
    @Post('usersAnswers')
    findUserAnswers(@Body() updateAnswerDto: UpdateAnswerDto){
        return this.answersService.findUserAnswers(updateAnswerDto);
    }

    // Find single answer
    @Get(':answerId')
    findOneAnswer(@Param('answerId') answerId: number) {
        return this.answersService.findOneAnswer(answerId);
    }
    
    // Update answer
    @Patch(':answerId')
    updateAnswer(
        @Param('answerId') answerId: number,
        @Body() updateAnswerDto: UpdateAnswerDto) {
        return this.answersService.updateAnswer(answerId, updateAnswerDto);
    }

    // Delete answer
    @Delete(':answerId')
    removeAnswer(@Param('answerId') answerId: number) {
        return this.answersService.removeAnswer(answerId);
    }
}
