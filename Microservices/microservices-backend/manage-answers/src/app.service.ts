import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { QuestionsService } from './questions/questions.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Question } from './entities/question.entity';
import { ClientProxy } from '@nestjs/microservices';

const logger = new Logger('ManageAnswers')

@Injectable()
export class AppService {
    constructor(
        @InjectEntityManager('msManageAnswersQuestionsConnection') private manager: EntityManager,
        @Inject('MANAGE_ANSWERS') private client: ClientProxy,
        private questionsService: QuestionsService
    ) { }

    // Create new answer
    // Check wether user and question exist. If so, create new answer.
    async createAnswer(createAnswerDto: CreateAnswerDto, user): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const questionExists = await this.questionsService.findOneQuestion(createAnswerDto.questionId);
            if (!questionExists) throw new NotFoundException('Question does not exits. Answer not created!');
            if (user.email != createAnswerDto.createdBy) throw new ConflictException('User cannot create answer for another email');
            const newAnswer = await manager.create(Answer, createAnswerDto);
            newAnswer.question = questionExists;
            const result = await manager.save(newAnswer);
            
            console.log('begin publisher');
            
            const pattern = { cmd: 'create_answer' };
            try {
                const publishedAnswer = await this.publishAnswers(newAnswer, pattern);
                logger.log('Executing' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            console.log('end publisher');
            

            return result;
        })
    }

    // Update answer
    async updateAnswer(answerId: number, updateAnswerDto: UpdateAnswerDto, user): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const answerExists = await manager.findOne(Answer, answerId, { relations: ['question'] });
            if (updateAnswerDto.createdBy != undefined && user.email != updateAnswerDto) throw new ConflictException('User can only create or update his own answers')
            if (!answerExists) throw new NotFoundException('Answer does not exist!');
            if (updateAnswerDto.questionId != answerExists.question.questionId) {
                const newQuestionExists = await manager.findOne(Question, updateAnswerDto.questionId);
                if (!newQuestionExists) throw new NotFoundException('New question does not exits. Answer not updated!');
                answerExists.question = newQuestionExists;
            }
            manager.merge(Answer, answerExists, updateAnswerDto);
            const result = await manager.save(answerExists);

            const pattern = { cmd: 'update_answer' };
            const payload = { updateAnswerDto, answerId: answerId }
            try {
                const publishedAnswer = await this.publishAnswers(payload, pattern);
                logger.log('Executing' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }

            return result;
        })
    }

    // Delete answer
    async removeAnswer(answerId: number, user): Promise<any> {
        return this.manager.transaction(async manager => {
            const answerExists = await this.manager.findOne(Answer, answerId, { relations: ['question'] });
            if (!answerExists) throw new NotFoundException('Question does not exits!');
            if (user.email != answerExists.createdBy) throw new ConflictException('User cannot delete questions created by another user')
            const result = await manager.delete(Answer, answerId);

            const pattern = { cmd: 'delete_answer' }
            try {
                const publishedQuestion = await this.publishAnswers(answerId, pattern);
                logger.log('Executing' + pattern.cmd);
            } catch (error) {
                logger.log(error.message);
                throw new Error(error);
            }
            
            return result
        })
    }

    async publishAnswers(payload, pattern) {
        const result = await this.client.send(pattern, payload);
        return result.toPromise();
    }
}
