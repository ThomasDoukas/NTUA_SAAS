import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity({name: 'Answers'})
export class Answer {
    @PrimaryGeneratedColumn()
    answerId: number

    @Index({fulltext: true})
    @Column()
    body: string

    // createdBy email? 
    @Column()
    createdBy: string

    @CreateDateColumn({type: 'timestamptz'})
    timeCreated: Date

    @UpdateDateColumn({type: 'timestamptz'})
    timeModified: Date

    @ManyToOne(() => Question, question => question.answers, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'questionId' })
    question: Question
}
