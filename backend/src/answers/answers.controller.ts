import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('saas/architecture/answers/')
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

    // Find single answer
    @Get(':answerId')
    findOne(@Param('answerId') answerId: number) {
        return this.answersService.findOne(answerId);
    }

    // Update answer
    @Patch(':answerId')
    update(@Param('answerId') answerId: number, @Body() updateAnswerDto: UpdateAnswerDto) {
        return this.answersService.update(+answerId, updateAnswerDto);
    }

    // Delete answer
    @Delete(':answerId')
    remove(@Param('answerId') answerId: number) {
        return this.answersService.remove(answerId);
    }
}
