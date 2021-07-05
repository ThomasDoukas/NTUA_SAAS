import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('saas/microservices/browse/answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }

    // // Create answer
    // @UseGuards(JwtAuthGuard)
    // @Post()
    // createAnswer(
    //     @Body() createAnswerDto: CreateAnswerDto,
    //     @Request() req
    // ) {
    //     return this.answersService.createAnswer(createAnswerDto, req.user);
    // }

    // // Find all answers DO NOT NEED THIS
    // @Get()
    // findAllAnswers() {
    //     return this.answersService.findAllAnswers();
    // }

    // Find users answers
    @UseGuards(JwtAuthGuard)
    @Post('usersAnswers')
    findUserAnswers(
        @Body() updateAnswerDto: UpdateAnswerDto,
        @Request() res
    ) {
        return this.answersService.findUserAnswers(updateAnswerDto, res.user);
    }

    // Find single answer
    @Get(':answerId')
    findOneAnswer(@Param('answerId') answerId: number) {
        return this.answersService.findOneAnswer(answerId);
    }

    // // Update answer
    // @UseGuards(JwtAuthGuard)
    // @Patch(':answerId')
    // updateAnswer(
    //     @Param('answerId') answerId: number,
    //     @Body() updateAnswerDto: UpdateAnswerDto,
    //     @Request() req
    // ) {
    //     return this.answersService.updateAnswer(answerId, updateAnswerDto, req.user);
    // }

    // // Delete answer
    // @UseGuards(JwtAuthGuard)
    // @Delete(':answerId')
    // removeAnswer(@Param('answerId') answerId: number,
    //     @Request() req
    // ) {
    //     return this.answersService.removeAnswer(answerId, req.user);
    // }
}
