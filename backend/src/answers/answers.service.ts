import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersService } from 'src/users/users.service';
import { EntityManager } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor( @InjectEntityManager('questionsConnection') private manager: EntityManager,
    private questionsService: QuestionsService,
    private usersService: UsersService
    ) {}

    // Create new answer
    // Check wether user and question exist. If so, create new answer.
    async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        return this.manager.transaction(async manager => {
            // findUserFromEmail already takes care of the exception if needed!
            await this.usersService.findUserFromEmail(createAnswerDto.createdBy);
            const questionExists = await this.questionsService.findOneQuestion(createAnswerDto.questionId);
            if(!questionExists) throw new NotFoundException('Question does not exits. Answer not created!')
            const newAnswer = await manager.create(Answer, createAnswerDto);
            newAnswer.question = questionExists;
            return await manager.save(newAnswer);
        })
    }

    // Return all answers with their corresponding question
    async findAllAnswers(): Promise<Answer[]> {
        return this.manager.find(Answer, {relations: ['question', 'question.labels']});
    }

    // Find single answer
    async findOne(answerId: number): Promise<Answer> {
        const answerExists = await this.manager.findOne(Answer, answerId, { relations: ['question'] });
        if(!answerExists) throw new NotFoundException('Answer does not exist!');
        return answerExists;
    }

    // Get Users Answers
    async findUserAnswers(updateAnswerDto: UpdateAnswerDto): Promise<Answer[]> {
        return this.manager.transaction(async manager => {
            // findUserFromEmail already takes care of the exception if needed!
            if(!updateAnswerDto.createdBy) throw new BadRequestException('Please provide user email')
            await this.usersService.findUserFromEmail(updateAnswerDto.createdBy);
            const userQuestions = manager.find(Answer, {where: {createdBy: updateAnswerDto.createdBy}, relations: ['question', 'question.labels']}) 
            return userQuestions;
        })
    }

    // Update answer
    async update(answerId: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const answerExists = await manager.findOne(Answer, answerId, {relations: ['question']});
            if(!answerExists) throw new NotFoundException('Answer does not exist!');
            if(updateAnswerDto.createdBy != answerExists.createdBy){
                // findUserFromEmail already takes care of the exception if needed!
                await this.usersService.findUserFromEmail(updateAnswerDto.createdBy);
            }
            if(updateAnswerDto.questionId != answerExists.question.questionId){
                const newQuestionExists = await manager.findOne(Question, updateAnswerDto.questionId);
                if(!newQuestionExists) throw new NotFoundException('New question does not exits. Answer not updated!');
                answerExists.question = newQuestionExists;
            }
            manager.merge(Answer, answerExists, updateAnswerDto);
            return await manager.save(answerExists);
        })
    }

    // Delete answer
    async remove(answerId: number):Promise<any> {
        return this.manager.transaction(async manager => {
            const answerExists = await this.manager.findOne(Answer, answerId, {relations: ['question']});
            if(!answerExists) throw new NotFoundException('Question does not exits!');
            return await manager.delete(Answer, answerId);  
        })
    }
}
