import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity({name: "Answers"})
export class Answer {
    @PrimaryGeneratedColumn()
    answerId: number

    @Column()
    body: string

    // createdBy userId or email? 
    @Column()
    createdBy: string

    @Column()
    timeCreated: Date

    @Column()
    upVotes: number

    @ManyToOne(() => Question, question => question.answers, {onDelete: "CASCADE"})
    @JoinColumn({name: 'questionId' })
    question: Question
}
