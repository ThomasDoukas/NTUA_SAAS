import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Label } from 'src/questions-answers/questions/entities/label.entity';
import { ContributionDto } from './dto/contribution.dto';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectEntityManager('questionsConnection') private manager: EntityManager,
    ) { }

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
            obj.answers = (obj.answers === null ? 0 : parseInt(obj.answers));
            return obj;
        });
        return res;
    }

    // Get user contribution per date - statistic purposes
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
