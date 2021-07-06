import { Body, Controller, Get, Post, UseGuards, Request, Param, Patch, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('saas/microservices/manageAnswers/')
export class AppController {
    answersService: any;
    constructor(private readonly appService: AppService) { }
    
    // Create answer
    @UseGuards(JwtAuthGuard)
    @Post()
    createAnswer(
        @Body() createAnswerDto: CreateAnswerDto,
        @Request() req
    ) {
        return this.appService.createAnswer(createAnswerDto, req.user);
    }

    // // Find all answers DO NOT NEED THIS
    // @Get()
    // findAllAnswers() {
    //     return this.answersService.findAllAnswers();
    // }

    // // Find users answers
    // @UseGuards(JwtAuthGuard)
    // @Post('usersAnswers')
    // findUserAnswers(
    //     @Body() updateAnswerDto: UpdateAnswerDto,
    //     @Request() res
    // ) {
    //     return this.answersService.findUserAnswers(updateAnswerDto, res.user);
    // }

    // // Find single answer
    // @Get(':answerId')
    // findOneAnswer(@Param('answerId') answerId: number) {
    //     return this.answersService.findOneAnswer(answerId);
    // }

    // Update answer
    @UseGuards(JwtAuthGuard)
    @Patch(':answerId')
    updateAnswer(
        @Param('answerId') answerId: number,
        @Body() updateAnswerDto: UpdateAnswerDto,
        @Request() req
    ) {
        return this.answersService.updateAnswer(answerId, updateAnswerDto, req.user);
    }

    // Delete answer
    @UseGuards(JwtAuthGuard)
    @Delete(':answerId')
    removeAnswer(@Param('answerId') answerId: number,
        @Request() req
    ) {
        return this.answersService.removeAnswer(answerId, req.user);
    }

}
