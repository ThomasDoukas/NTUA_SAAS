import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Brackets, EntityManager } from 'typeorm';
import { SearchQuestionDto } from './dto/search-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectEntityManager('msBrowseQuestionsConnection') private manager: EntityManager
    ) { }

    // // Create new question
    // async createQuestion(createQuestionDto: CreateQuestionDto, user): Promise<Question> {
    //     return this.manager.transaction(async manager => {
    //         // findUserFromEmail already takes care of the exception if needed!
    //         // await this.usersService.findUserFromEmail(createQuestionDto.createdBy);
    //         if (user.email != createQuestionDto.createdBy) throw new ConflictException('User cannot create question for another email');
    //         const newQuestion = await manager.create(Question, createQuestionDto);
    //         return await manager.save(newQuestion);
    //     })
    // }

    // // Returns all questions REPLACED BY Search Questions
    // async findAllQuestions(): Promise<Question[]> {
    //     return await this.manager.find(Question, { relations: ['labels', 'answers'] })
    // }

    // Returns all labels DO NOT NEED THIS
    // async findAllLabels(): Promise<Label[]> {
    //     return await this.manager.find(Label, { relations: ['questions'] })
    // }

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

    // // Get questions for each label - statistic purposes
    // async findLabelQuestions(): Promise<Label[]> {
    //     return this.manager.transaction(async manager => {
    //         const query = manager.getRepository(Label)
    //             .createQueryBuilder('l')
    //             .leftJoinAndSelect('l.questions', 'q')
    //             .groupBy('l.labelTitle')
    //             .select('l.labelTitle', 'labelTitle')
    //             .addSelect('COUNT(q)', 'questionCounter')
    //             .orderBy('l.labelTitle', 'ASC')
    //         const res = await query.getRawMany();
    //         return res;
    //     })
    //     // return this.manager.transaction(async manager => {
    //     //     const labelQuestions = manager.findAndCount(Label, { relations: ['questions', 'questions.answers'], order: { labelTitle: 'ASC' } })
    //     //     return labelQuestions;
    //     // })
    // }

    // // Get questions for each date - statistic purposes
    // async findDateQuestions(searchQuestionDto): Promise<any> {
    //     return this.manager.transaction(async manager => {
    //         const query = manager.getRepository(Question)
    //             .createQueryBuilder('q')

    //         // Search by Date
    //         if (searchQuestionDto.fromDate > searchQuestionDto.toDate) throw new BadRequestException('fromDate cannot take place after toDate!');
    //         if (searchQuestionDto.fromDate && searchQuestionDto.toDate) {
    //             // let temp = searchQuestionDto.fromDate
    //             if (searchQuestionDto.fromDate === searchQuestionDto.toDate) {
    //                 // Same fromDate and toDate value specifies single day
    //                 query.andWhere('DATE(q.timeCreated) = DATE(:searchDate)', { searchDate: searchQuestionDto.fromDate })
    //             }
    //             else {
    //                 // Different values specify a period of time
    //                 query.andWhere('DATE(q.timeCreated) >= DATE(:from) AND DATE(q.timeCreated) <= DATE(:to)', { from: searchQuestionDto.fromDate, to: searchQuestionDto.toDate })
    //             }
    //         }
    //         // For questions created after fromDate
    //         else if (searchQuestionDto.fromDate && !searchQuestionDto.toDate)
    //             query.andWhere('DATE(q.timeCreated) >= DATE(:searchDate)', { searchDate: searchQuestionDto.fromDate })
    //         // For questions created before toDate
    //         else if (!searchQuestionDto.fromDate && searchQuestionDto.toDate)
    //             query.andWhere('DATE(q.timeCreated) <= DATE(:searchDate)', { searchDate: searchQuestionDto.toDate })

    //         query.groupBy('DATE(q.timeCreated)')
    //             .select('DATE(q.timeCreated)', 'timeCreated')
    //             .addSelect('COUNT(q)', 'questionCounter')
    //         const res = await query.orderBy('DATE(q.timeCreated)', 'DESC').getRawMany();

    //         return res.map(el => {
    //             return {
    //                 // 'timeCreated': `${el.timeCreated.getUTCFullYear()}-${el.timeCreated.getUTCMonth()}-${el.timeCreated.getUTCDate()}`,
    //                 'timeCreated': new Date(el.timeCreated.setHours( el.timeCreated.getHours() - (el.timeCreated.getTimezoneOffset() / 60))),
    //                 'questionsCounter': el.questionCounter
    //             }
    //         })
    //     })
    // }

    // // Get user contribution per date - statistic purposes
    // async findDailyContribution(searchQuestionDto: SearchQuestionDto): Promise<any> {
    //     return this.manager.transaction(async manager => {
    //         if (!searchQuestionDto.email) throw new BadRequestException('Please provide user email!')

    //         const questions: {timeCreated: Date, questionCounter: string}[] = await manager.getRepository(Question)
    //             .createQueryBuilder('q')
    //             .where('q.createdBy = :email', { email: searchQuestionDto.email })
    //             .groupBy('DATE(q.timeCreated)')
    //             .select('DATE(q.timeCreated)', 'timeCreated')
    //             .addSelect('COUNT(q)', 'questionCounter')
    //             .orderBy('DATE(q.timeCreated)', 'DESC')
    //             .getRawMany();

    //         const answers: { timeCreated: Date, answerCounter: string }[] = await manager.getRepository(Answer)
    //             .createQueryBuilder('a')
    //             .where('a.createdBy = :email', { email: searchQuestionDto.email })
    //             .groupBy('DATE(a.timeCreated)')
    //             .select('DATE(a.timeCreated)', 'timeCreated')
    //             .addSelect('COUNT(a)', 'answerCounter')
    //             .orderBy('DATE(a.timeCreated)', 'DESC')
    //             .getRawMany();

    //         const res = {
    //             'questions': questions.map(el => {
    //                 return {
    //                     // 'timeCreated': `${el.timeCreated.getUTCFullYear()}-${el.timeCreated.getUTCMonth()}-${el.timeCreated.getUTCDate()}`,
    //                     'timeCreated': new Date(el.timeCreated.setHours( el.timeCreated.getHours() - (el.timeCreated.getTimezoneOffset() / 60))),
    //                     'questionsCounter': el.questionCounter
    //                 }
    //             }),
    //             'answers': answers.map(el => {
    //                 return{
    //                     'timeCreated': new Date(el.timeCreated.setHours( el.timeCreated.getHours() - (el.timeCreated.getTimezoneOffset() / 60))),
    //                     'answersCounter': el.answerCounter
    //                 }
    //             })
    //         }

    //         return res
    //     })
    // }

    // Get Users Questions
    async findUserQuestions(searchQuestionDto: SearchQuestionDto, user): Promise<Question[]> {
        return this.manager.transaction(async manager => {
            // findUserFromEmail already takes care of the exception if needed!
            if (!searchQuestionDto.email) throw new BadRequestException('Please provide user email')
            // await this.usersService.findUserFromEmail(searchQuestionDto.email);
            if (user.email != searchQuestionDto.email) throw new ConflictException('User cannot search questions created by another account from here');
            const userQuestions = manager.find(Question, { where: { createdBy: searchQuestionDto.email }, relations: ['labels', 'answers'] })
            return userQuestions;
        })
    }

    // // Update question
    // async updateQuestion(questionId: number, updateQuestionDto: UpdateQuestionDto, user): Promise<Question> {
    //     return this.manager.transaction(async manager => {
    //         const questionExists = await manager.findOne(Question, questionId);
    //         if (!questionExists) throw new NotFoundException(`Question ${questionId} not found!`);
    //         if (user.email != updateQuestionDto.createdBy) throw new ConflictException('User can only create or update his own questions');
    //         manager.merge(Question, questionExists, updateQuestionDto);
    //         return await manager.save(questionExists);
    //     })
    // }

    // // Delete question
    // async removeQuestion(questionId: number, user): Promise<any> {
    //     return this.manager.transaction(async manager => {
    //         const questionExists = await manager.findOne(Question, questionId, { relations: ['labels'] });
    //         if (!questionExists) throw new NotFoundException('Question not found!');
    //         if (user.email != questionExists.createdBy) throw new ConflictException('User cannot delete questions created by another user');
    //         const deletedQuestion = await manager.delete(Question, questionId);

    //         // Check wether or not we should delete this question's labels.
    //         // Find all labels of deleted question
    //         const questionLabels = await manager.find(Label, {
    //             where: [
    //                 ...questionExists.labels
    //             ],
    //             relations: ['questions']
    //         })

    //         // For each label check the corresponding questions
    //         const deleteLabels = questionLabels
    //             .filter(
    //                 (el: { labelTitle: string, questions: Question[] }) => {
    //                     return el.questions.length === 0;
    //                 })
    //             .map((el: { labelTitle: string, questions: Question[] }) => {
    //                 return { labelTitle: el.labelTitle };
    //             })
    //         // Delete all labels with no questions (empty questions array)
    //         if (deleteLabels) await manager.delete(Label, [...deleteLabels]);

    //         // Running
    //         // for (let i = 0; i < questionExists.labels.length; i++){
    //         //     const test = await manager.findOne(Label, questionExists.labels[i], {relations: ['questions']});
    //         //     if(test.questions.length === 0)
    //         //         await manager.delete(Label, test.labelTitle)
    //         // }

    //         return deletedQuestion;
    //     });
    // }
}
