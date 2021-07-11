import { Body, Controller, Get, Post, UseGuards, Request, Param, Patch, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('saas/microservices/manageAnswers/')
export class AppController {
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

    // Update answer
    @UseGuards(JwtAuthGuard)
    @Patch(':answerId')
    updateAnswer(
        @Param('answerId') answerId: number,
        @Body() updateAnswerDto: UpdateAnswerDto,
        @Request() req
    ) {
        return this.appService.updateAnswer(answerId, updateAnswerDto, req.user);
    }

    // Delete answer
    @UseGuards(JwtAuthGuard)
    @Delete(':answerId')
    removeAnswer(@Param('answerId') answerId: number,
        @Request() req
    ) {
        return this.appService.removeAnswer(answerId, req.user);
    }

}
