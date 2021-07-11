import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ContributionDto } from './dto/contribution.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Answer } from './entities/answer.entity';
import { Label } from './entities/label.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {

    constructor(
        @InjectEntityManager('mAnalyticsQuestionsConnection') private manager: EntityManager
    ) {
    }

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
            // Delete all labels with no questions (empty questions array)
            if (deleteLabels) await manager.delete(Label, [...deleteLabels]);

            return deletedQuestion;
        })
    }

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

    // Get questions for each label - statistic purposes
    async findLabelQuestions(): Promise<Label[]> {
        return this.manager.transaction(async manager => {
            const query = await manager.getRepository(Label)
                .createQueryBuilder('l')
                .leftJoinAndSelect('l.questions', 'q')
                .groupBy('l.labelTitle')
                .select('l.labelTitle', 'labelTitle')
                .addSelect('COUNT(q)', 'counter')
                .orderBy('counter', 'DESC')
                .getRawMany();

            if (query.length > 10) {
                const show = query.slice(0, 10)
                console.log(show);

                const other = query.slice(10)
                const reducedOther = other.reduce(function (previousValue, currentValue) {
                    return {
                        labelTitle: "other",
                        counter: parseInt(previousValue.counter) + parseInt(currentValue.counter)
                    }
                });
                console.log(reducedOther);

                const res = show.concat(reducedOther);
                return res;
            }
            else
                return query;

        })
    }

    // Get questions for each date - statistic purposes
    async findDateQuestions(contributionDto: ContributionDto): Promise<any> {
        const query = await this.manager
            .query(`
                    SELECT EXTRACT(DAY FROM "q"."timeCreated") AS "day", COUNT(*) AS "questions", a.answers AS "answers"
                    FROM "Questions" AS "q" 
                    LEFT JOIN(
                            SELECT EXTRACT(DAY FROM "ans"."timeCreated") AS "day", COUNT(*) AS "answers"
                            FROM "Answers" "ans"
                            WHERE EXTRACT(YEAR FROM "ans"."timeCreated") = ${contributionDto.year} AND EXTRACT(MONTH FROM "ans"."timeCreated") = ${contributionDto.month}
                            GROUP BY EXTRACT(DAY FROM "ans"."timeCreated")
                        )
                    "a" ON a.day = EXTRACT(DAY FROM "q"."timeCreated")
                    WHERE EXTRACT(YEAR FROM "q"."timeCreated") = ${contributionDto.year} AND EXTRACT(MONTH FROM "q"."timeCreated") = ${contributionDto.month}
                    GROUP BY EXTRACT(DAY FROM "q"."timeCreated"), a.answers
                `)

        const res = query.map(function (obj) {
            obj.answers = (obj.answers === null ? 0 : obj.answers);
            return obj;
        });
        return res;
    }

    async findDailyContribution(contributionDto: ContributionDto, user): Promise<any> {
        if (!contributionDto.email) throw new BadRequestException('Please provide user email!')
        if (contributionDto.email != user.email) throw new ConflictException('User email does not match jwt email.')
        const query = await this.manager
            .query(`
                SELECT EXTRACT(DAY FROM "q"."timeCreated") AS "day", COUNT(*) AS "questions", a.answers AS "answers"
                FROM "Questions" "q"
                LEFT JOIN
                (
                    SELECT EXTRACT(DAY FROM "ans"."timeCreated") AS "day", COUNT(*) AS "answers" 
                    FROM "Answers" "ans" 
                    WHERE "ans"."createdBy" = '${contributionDto.email}' AND EXTRACT(YEAR FROM "ans"."timeCreated") = ${contributionDto.year} AND EXTRACT(MONTH FROM "ans"."timeCreated") = ${contributionDto.month}
                    GROUP BY EXTRACT(DAY FROM "ans"."timeCreated")
                )
                "a" ON a.day = EXTRACT(DAY FROM "q"."timeCreated") WHERE "q"."createdBy" = '${contributionDto.email}' AND EXTRACT(YEAR FROM "q"."timeCreated") = ${contributionDto.year} AND EXTRACT(MONTH FROM "q"."timeCreated") = ${contributionDto.month} 
                GROUP BY EXTRACT(DAY FROM "q"."timeCreated"), a.answers
            `)

        const res = query.map(function (obj) {
            obj.answers = (obj.answers === null ? 0 : obj.answers);
            return obj;
        });
        return res;
    }
}
