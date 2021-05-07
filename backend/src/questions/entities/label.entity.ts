import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity({name: 'Labels'})
export class Label {
    // @PrimaryGeneratedColumn()
    // labelId: number

    @PrimaryColumn()
    labelTitle: string

    @ManyToMany(type => Question, question => question.labels, {onDelete: "CASCADE"})
    questions: Question[]
}