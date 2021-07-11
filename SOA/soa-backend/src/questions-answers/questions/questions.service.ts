import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Brackets, EntityManager, ILike } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SearchQuestionDto } from './dto/search-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Label } from './entities/label.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectEntityManager('questionsConnection') private manager: EntityManager,
    ) { }

    // Create new question
    async createQuestion(createQuestionDto: CreateQuestionDto, user): Promise<Question> {
        return this.manager.transaction(async manager => {
            if(user.email != createQuestionDto.createdBy) throw new ConflictException('User cannot create question for another email');
            const newQuestion = await manager.create(Question, createQuestionDto);
            return await manager.save(newQuestion);
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

    // Update question
    async updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto, user): Promise<Question> {
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, questionId);
            if (!questionExists) throw new NotFoundException(`Question ${questionId} not found!`);
            if (user.email != updateQuestionDto.createdBy) throw new ConflictException('User can only create or update his own questions');
            manager.merge(Question, questionExists, updateQuestionDto);
            return await manager.save(questionExists);
        })
    }

    // Delete question
    async removeQuestion(questionId: number, user): Promise<any> {
        return this.manager.transaction(async manager => {
            const questionExists = await manager.findOne(Question, questionId, { relations: ['labels'] });
            if (!questionExists) throw new NotFoundException('Question not found!');
            if(user.email != questionExists.createdBy) throw new ConflictException('User cannot delete questions created by another user');
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

            return deletedQuestion;
        });
    }

}
