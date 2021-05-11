import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Label } from './entities/label.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectEntityManager('questionsConnection') private manager: EntityManager,
        private usersService: UsersService
        ) { }

    // Create new question
    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            // findUserFromEmail already takes care of the exception if needed!
            await this.usersService.findUserFromEmail(createQuestionDto.createdBy);
            const newQuestion = await manager.create(Question, createQuestionDto);
            return await manager.save(newQuestion);
        })
    }

    // Returns all questions
    async findAllQuestions(): Promise<Question[]> {
        return await this.manager.find(Question, { relations: ['labels', 'answers'] })
    }

    // Returns all labels
    async findAllLabels(): Promise<Label[]> {
        return await this.manager.find(Label, { relations: ['questions'] })
    }

    // Find single question
    async findOneQuestion(questionId: number): Promise<Question> {
        const questionExists = await this.manager.findOne(Question, questionId, { relations: ['labels', 'answers'] });
        if(!questionExists) throw new NotFoundException('Question does not exist!');
        return questionExists;
    }

    // Update question
    async updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, questionId);
            if (!questionExists) throw new NotFoundException(`Question ${questionId} not found!`);
            manager.merge(Question, questionExists, updateQuestionDto);
            return await manager.save(questionExists);
        })
    }
    
    // Delete question
    async removeQuestion(questionId: number): Promise<any> {
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, questionId, { relations: ['labels'] });
            if (!questionExists) throw new NotFoundException('Question not found!');
            const deletedQuestion = await manager.delete(Question, questionId);

            // Check wether or not we should delete this question's labels.
            // Find all labels of deleted question
            const questionLabels = await manager.find(Label, { 
                where: [
                    ...questionExists.labels
                ],
                relations: ['questions'] 
            })

            // For each label check the corresponding questions
            const deleteLabels = questionLabels
                .filter(
                    (el: {labelTitle: string, questions: Question[]}) => {
                        return el.questions.length === 0;
                })
                .map( (el: {labelTitle: string, questions: Question[]}) => {
                    return {labelTitle: el.labelTitle};
                })
            // Delete all labels with no questions (empty questions array)
            if(deleteLabels) await manager.delete(Label, [...deleteLabels]);

            // Running
            // for (let i = 0; i < questionExists.labels.length; i++){
            //     const test = await manager.findOne(Label, questionExists.labels[i], {relations: ['questions']});
            //     if(test.questions.length === 0)
            //         await manager.delete(Label, test.labelTitle)
            // }

            return deletedQuestion;
        });
    }
    
}
