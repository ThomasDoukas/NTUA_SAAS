import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectEntityManager('msManageAnswersQuestionsConnection') private manager: EntityManager
    ) { }

    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            const newQuestion = await manager.create(Question, createQuestionDto);
            return await manager.save(newQuestion);
        })
    }

    async updateQuestion(payload): Promise<Question> {
        // payload = {QuestionId, updateQuestion}
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, payload.questionId);
            manager.merge(Question, questionExists, payload.updateQuestionDto);
            return await manager.save(questionExists)
        })
    }

    async deleteQuestion(payload): Promise<any> {
        return await this.manager.delete(Question, payload);
    }

    // Find single question
    async findOneQuestion(questionId: number): Promise<Question> {
        const questionExists = await this.manager.findOne(Question, questionId, { relations: ['answers'] });
        if (!questionExists) throw new NotFoundException('Question does not exist!');
        return questionExists;
    }

}
