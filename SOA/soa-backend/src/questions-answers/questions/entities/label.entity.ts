import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity({name: 'Labels'})
export class Label {

    @PrimaryColumn()
    labelTitle: string

    @ManyToMany(type => Question, question => question.labels, {onDelete: 'CASCADE'})
    questions: Question[]
}