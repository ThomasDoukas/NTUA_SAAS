import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Label } from './entites/label.entity';
import { Question } from './entites/question.entity';

const logger = new Logger('ManageQuestions')

@Injectable()
export class AppService {
    constructor(
        @InjectEntityManager('msManageQuestionsQuestionsConnection') private manager: EntityManager,
        @Inject('MANAGE_QUESTIONS') private client: ClientProxy
    ) { }

    // Create new question
    async createQuestion(createQuestionDto: CreateQuestionDto, user): Promise<Question> {
        return this.manager.transaction(async manager => {
            if (user.email != createQuestionDto.createdBy) throw new ConflictException('User cannot create question for another email');
            const newQuestion = await manager.create(Question, createQuestionDto);
            const result = await manager.save(newQuestion);

            const pattern = { cmd: 'create_question' };
            try {
                const publishedQuestion = await this.publishQuestions(newQuestion, pattern);
                logger.log('Executing' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            return result
        })
    }

    // Update question
    async updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto, user): Promise<Question> {
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, questionId);
            if (!questionExists) throw new NotFoundException(`Question ${questionId} not found!`);
            if (user.email != updateQuestionDto.createdBy) throw new ConflictException('User can only create or update his own questions');
            manager.merge(Question, questionExists, updateQuestionDto);
            const result = await manager.save(questionExists);

            const pattern = { cmd: 'update_question' };
            const payload = { updateQuestionDto, questionId: questionId }
            try {
                const publishedQuestion = await this.publishQuestions(payload, pattern);
                logger.log('Executing' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            return result;
        })
    }

    // Delete question
    async removeQuestion(questionId: number, user): Promise<any> {
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, questionId, { relations: ['labels'] });
            if (!questionExists) throw new NotFoundException('Question not found!');
            if (user.email != questionExists.createdBy) throw new ConflictException('User cannot delete questions created by another user');
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
                    (el: { labelTitle: string, questions: Question[] }) => {
                        return el.questions.length === 0;
                    })
                .map((el: { labelTitle: string, questions: Question[] }) => {
                    return { labelTitle: el.labelTitle };
                })
            // Delete all labels with no questions (empty questions array)
            if (deleteLabels) await manager.delete(Label, [...deleteLabels]);

            const pattern = { cmd: 'delete_question' };
            try {
                const publishedQuestion = await this.publishQuestions(questionId, pattern);
                logger.log('Executing' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            return deletedQuestion;
        });
    }

    async publishQuestions(payload, pattern) {
        const result = await this.client.send(pattern, payload);
        return result.toPromise();
    }

}
