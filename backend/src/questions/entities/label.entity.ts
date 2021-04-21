import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity({name: "Labels"})
export class Label {
    @PrimaryGeneratedColumn()
    labelId: number

    @Column()
    labelTitle: string

    @ManyToOne(() => Question, question => question.labels, {onDelete: "CASCADE"})
    @JoinColumn({name: 'questionId' })
    question: Question
}