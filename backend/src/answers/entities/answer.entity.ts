import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity({name: 'Answers'})
export class Answer {
    @PrimaryGeneratedColumn()
    answerId: number

    @Column()
    body: string

    // createdBy email? 
    @Column()
    createdBy: string

    @CreateDateColumn()
    timeCreated: Date

    @UpdateDateColumn()
    timeModified: Date

    @Column({default: 0})
    upVotes: number

    @ManyToOne(() => Question, question => question.answers, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'questionId' })
    question: Question
}
