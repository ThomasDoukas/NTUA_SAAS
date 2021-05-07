import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Label } from './entities/label.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
    constructor(@InjectEntityManager('questionsConnection') private manager: EntityManager) { }

    // Create new question
    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const newQuestion = await this.manager.create(Question, createQuestionDto);
        return await this.manager.save(newQuestion);
    }

    // Returns all questions
    async findAllQuestions(): Promise<Question[]> {
        return await this.manager.find(Question, { relations: ['labels'] })
    }

    // Returns all labels
    async findAllLabels(): Promise<Label[]> {
        return await this.manager.find(Label, { relations: ['questions'] })
    }

    // Find single question
    async findOneQuestion(questionId: number) {
        return await this.manager.findOne(Question, questionId, { relations: ['labels'] });
    }

    // Update question
    async updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto) {
        return this.manager.transaction(async manager => {
            const questionExists = await this.manager.findOne(Question, questionId);
            if (!questionExists) throw new NotFoundException(`Question ${questionId} not found`);
            manager.merge(Question, questionExists, updateQuestionDto);
            return await manager.save(questionExists);
        })
    }

    // Delete question
    async removeQuestion(questionId: number) {
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, questionId, { relations: ['labels'] });
            if (!questionExists) throw new NotFoundException('Question not found');
            const deletedQuestion = await manager.delete(Question, questionId);
            for (let i = 0; i < questionExists.labels.length; i++){
                const test = await manager.findOne(Label, questionExists.labels[i], {relations: ['questions']});
                if(test.questions.length === 0)
                    await manager.delete(Label, test.labelTitle)
            }
            return deletedQuestion;
        });
    }

}
