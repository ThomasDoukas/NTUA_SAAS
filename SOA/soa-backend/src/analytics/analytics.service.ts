import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { SearchQuestionDto } from './dto/search-question.dto';
import { Answer } from 'src/answers/entities/answer.entity';
import { Label } from 'src/questions/entities/label.entity';
import { Question } from 'src/questions/entities/question.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectEntityManager('questionsConnection') private manager: EntityManager,
    ) { }

    // Get questions for each label - statistic purposes
    async findLabelQuestions(): Promise<Label[]> {
        return this.manager.transaction(async manager => {
            const query = manager.getRepository(Label)
                .createQueryBuilder('l')
                .leftJoinAndSelect('l.questions', 'q')
                .groupBy('l.labelTitle')
                .select('l.labelTitle', 'labelTitle')
                .addSelect('COUNT(q)', 'questionCounter')
                .orderBy('l.labelTitle', 'ASC')
            const res = await query.getRawMany();
            return res;
        })
        // return this.manager.transaction(async manager => {
        //     const labelQuestions = manager.findAndCount(Label, { relations: ['questions', 'questions.answers'], order: { labelTitle: 'ASC' } })
        //     return labelQuestions;
        // })
    }

    // Get questions for each date - statistic purposes
    async findDateQuestions(searchQuestionDto): Promise<any> {
        return this.manager.transaction(async manager => {
            const query = manager.getRepository(Question)
                .createQueryBuilder('q')

            // Search by Date
            if (searchQuestionDto.fromDate > searchQuestionDto.toDate) throw new BadRequestException('fromDate cannot take place after toDate!');
            if (searchQuestionDto.fromDate && searchQuestionDto.toDate) {
                // let temp = searchQuestionDto.fromDate
                if (searchQuestionDto.fromDate === searchQuestionDto.toDate) {
                    // Same fromDate and toDate value specifies single day
                    query.andWhere('DATE(q.timeCreated) = DATE(:searchDate)', { searchDate: searchQuestionDto.fromDate })
                }
                else {
                    // Different values specify a period of time
                    query.andWhere('DATE(q.timeCreated) >= DATE(:from) AND DATE(q.timeCreated) <= DATE(:to)', { from: searchQuestionDto.fromDate, to: searchQuestionDto.toDate })
                }
            }
            // For questions created after fromDate
            else if (searchQuestionDto.fromDate && !searchQuestionDto.toDate)
                query.andWhere('DATE(q.timeCreated) >= DATE(:searchDate)', { searchDate: searchQuestionDto.fromDate })
            // For questions created before toDate
            else if (!searchQuestionDto.fromDate && searchQuestionDto.toDate)
                query.andWhere('DATE(q.timeCreated) <= DATE(:searchDate)', { searchDate: searchQuestionDto.toDate })

            query.groupBy('DATE(q.timeCreated)')
                .select('DATE(q.timeCreated)', 'timeCreated')
                .addSelect('COUNT(q)', 'questionCounter')
            const res = await query.orderBy('DATE(q.timeCreated)', 'DESC').getRawMany();

            return res.map(el => {
                return {
                    // 'timeCreated': `${el.timeCreated.getUTCFullYear()}-${el.timeCreated.getUTCMonth()}-${el.timeCreated.getUTCDate()}`,
                    'timeCreated': new Date(el.timeCreated.setHours( el.timeCreated.getHours() - (el.timeCreated.getTimezoneOffset() / 60))),
                    'questionsCounter': el.questionCounter
                }
            })
        })
    }

    // Get user contribution per date - statistic purposes
    async findDailyContribution(searchQuestionDto: SearchQuestionDto): Promise<any> {
        return this.manager.transaction(async manager => {
            if (!searchQuestionDto.email) throw new BadRequestException('Please provide user email!')

            const questions: {timeCreated: Date, questionCounter: string}[] = await manager.getRepository(Question)
                .createQueryBuilder('q')
                .where('q.createdBy = :email', { email: searchQuestionDto.email })
                .groupBy('DATE(q.timeCreated)')
                .select('DATE(q.timeCreated)', 'timeCreated')
                .addSelect('COUNT(q)', 'questionCounter')
                .orderBy('DATE(q.timeCreated)', 'DESC')
                .getRawMany();

            const answers: { timeCreated: Date, answerCounter: string }[] = await manager.getRepository(Answer)
                .createQueryBuilder('a')
                .where('a.createdBy = :email', { email: searchQuestionDto.email })
                .groupBy('DATE(a.timeCreated)')
                .select('DATE(a.timeCreated)', 'timeCreated')
                .addSelect('COUNT(a)', 'answerCounter')
                .orderBy('DATE(a.timeCreated)', 'DESC')
                .getRawMany();

            const res = {
                'questions': questions.map(el => {
                    return {
                        // 'timeCreated': `${el.timeCreated.getUTCFullYear()}-${el.timeCreated.getUTCMonth()}-${el.timeCreated.getUTCDate()}`,
                        'timeCreated': new Date(el.timeCreated.setHours( el.timeCreated.getHours() - (el.timeCreated.getTimezoneOffset() / 60))),
                        'questionsCounter': el.questionCounter
                    }
                }),
                'answers': answers.map(el => {
                    return{
                        'timeCreated': new Date(el.timeCreated.setHours( el.timeCreated.getHours() - (el.timeCreated.getTimezoneOffset() / 60))),
                        'answersCounter': el.answerCounter
                    }
                })
            }

            return res
        })
    }
}
