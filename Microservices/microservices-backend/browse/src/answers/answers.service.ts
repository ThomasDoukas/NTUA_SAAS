import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor(@InjectEntityManager('msBrowseQuestionsConnection') private manager: EntityManager
    ) { }

    async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const newAnswer = await manager.create(Answer, createAnswerDto);
            return await manager.save(newAnswer);
        })
    }

    async updateAnswer(payload): Promise<Answer> {
        // payload = {AnswerId, updateAnswer}
        return this.manager.transaction(async manager => {
            const answerExists = await manager.findOne(Answer, payload.answerId, { relations: ['question'] });
            manager.merge(Answer, answerExists, payload.updateAnswerDto);
            return await manager.save(answerExists);
        })
    }

    async deleteAnswer(payload): Promise<any> {
        return this.manager.transaction(async manager => {
            return await manager.delete(Answer, payload);
        })
    }

    // Find single answer
    async findOneAnswer(answerId: number): Promise<Answer> {
        const answerExists = await this.manager.findOne(Answer, answerId, { relations: ['question'] });
        if (!answerExists) throw new NotFoundException('Answer does not exist!');
        return answerExists;
    }

    // Get Users Answers
    async findUserAnswers(updateAnswerDto: UpdateAnswerDto, user): Promise<Answer[]> {
        return this.manager.transaction(async manager => {
            if (!updateAnswerDto.createdBy) throw new BadRequestException('Please provide user email');
            if (user.email != updateAnswerDto.createdBy) throw new ConflictException('User cannot search questions created by another account from here')
            const userQuestions = manager.find(Answer, { where: { createdBy: updateAnswerDto.createdBy }, relations: ['question', 'question.labels'] })
            return userQuestions;
        })
    }

}
