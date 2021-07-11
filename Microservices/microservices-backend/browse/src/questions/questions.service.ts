import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Brackets, EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SearchQuestionDto } from './dto/search-question.dto';
import { Label } from './entities/label.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectEntityManager('msBrowseQuestionsConnection') private manager: EntityManager
    ) { }

    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question>{
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
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, payload, { relations: ['labels'] });
            const deletedQuestion = await manager.delete(Question, payload);
            const questionLabels = await manager.find(Label, {
                where: [
                    ...questionExists.labels
                ],
                relations: ['questions']
            })
            const deleteLabels = questionLabels
                .filter(
                    (el: { labelTitle: string, questions: Question[] }) => {
                        return el.questions.length === 0;
                    })
                .map((el: { labelTitle: string, questions: Question[] }) => {
                    return { labelTitle: el.labelTitle };
                })
            if (deleteLabels) await manager.delete(Label, [...deleteLabels]);

            return deletedQuestion;
        })
    }

    // Find single question
    async findOneQuestion(questionId: number): Promise<Question> {
        const questionExists = await this.manager.findOne(Question, questionId, { relations: ['labels', 'answers'] });
        if (!questionExists) throw new NotFoundException('Question does not exist!');
        return questionExists;
    }

    // Advanced questions searching
    async searchQuestions(searchQuestionDto: SearchQuestionDto): Promise<Question[]> {
        return this.manager.transaction(async manager => {
            const query = manager.getRepository(Question)
                .createQueryBuilder('q')
                .leftJoinAndSelect('q.answers', 'a')

            // Search by Date
            if (searchQuestionDto.fromDate > searchQuestionDto.toDate) throw new BadRequestException('fromDate cannot take place after toDate!');
            if (searchQuestionDto.fromDate && searchQuestionDto.toDate)
                if (searchQuestionDto.fromDate === searchQuestionDto.toDate) {
                    // Same fromDate and toDate value specifies single day
                    query.andWhere('DATE(q.timeCreated) = DATE(:searchDate)', { searchDate: searchQuestionDto.fromDate })
                }
                else {
                    // Different values specify a period of time
                    query.andWhere('DATE(q.timeCreated) >= DATE(:from) AND DATE(q.timeCreated) <= DATE(:to)', { from: searchQuestionDto.fromDate, to: searchQuestionDto.toDate })
                }
            // For questions created after fromDate
            else if (searchQuestionDto.fromDate && !searchQuestionDto.toDate)
                query.andWhere('DATE(q.timeCreated) >= DATE(:searchDate)', { searchDate: searchQuestionDto.fromDate })
            // For questions created before toDate
            else if (!searchQuestionDto.fromDate && searchQuestionDto.toDate)
                query.andWhere('DATE(q.timeCreated) <= DATE(:searchDate)', { searchDate: searchQuestionDto.toDate })

            // Search by User
            if (searchQuestionDto.email)
                query.andWhere('q.createdBy = :email', { email: searchQuestionDto.email })

            // Search by Labels
            if (searchQuestionDto.labels)
                query.leftJoin('q.labels', 'labels')
                    .leftJoinAndSelect('q.labels', 'labelsSelect')
                    .andWhere('labels.labelTitle IN (:...title)', { title: searchQuestionDto.labels })
                    .orderBy('q.questionId', 'DESC', 'NULLS LAST')
            else
                query.leftJoinAndSelect('q.labels', 'labels')

            // Search by full text search
            if (searchQuestionDto.textSearch)
                query.andWhere(new Brackets(qb => {
                    qb.where('q.body ILIKE :query', { query: `%${searchQuestionDto.textSearch}%` })
                        .orWhere('q.title ILIKE :query', { query: `%${searchQuestionDto.textSearch}%` })
                        .orWhere('a.body ILIKE :query', { query: `%${searchQuestionDto.textSearch}%` })
                }))

            const res = await query.orderBy('q.timeCreated', 'DESC').getMany();
            return res;
        })

    }

    // Get Users Questions
    async findUserQuestions(searchQuestionDto: SearchQuestionDto, user): Promise<Question[]> {
        return this.manager.transaction(async manager => {
            if (!searchQuestionDto.email) throw new BadRequestException('Please provide user email')
            if (user.email != searchQuestionDto.email) throw new ConflictException('User cannot search questions created by another account from here');
            const userQuestions = manager.find(Question, { where: { createdBy: searchQuestionDto.email }, relations: ['labels', 'answers'] })
            return userQuestions;
        })
    }

}
