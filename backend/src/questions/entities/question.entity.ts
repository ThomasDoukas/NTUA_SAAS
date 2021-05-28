import { BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity';
import { Label } from './label.entity';

@Entity({name: 'Questions'})
export class Question {
    @PrimaryGeneratedColumn()
    questionId: number

    @Index({fulltext: true})
    @Column()
    title: string

    @Index({fulltext: true})
    @Column()
    body: string

    // createdBy email
    @Column()
    createdBy: string

    @CreateDateColumn({type: 'timestamptz'})
    timeCreated: Date
 
    @UpdateDateColumn({type: 'timestamptz'})
    timeModified: Date
    
    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

    @ManyToMany(type => Label, label => label.questions, {cascade: ['insert', 'update']})
    @JoinTable({name: 'Question_has_Labels'})
    labels: Label[];

    // More ideas up-voters(like labels)

}
