import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Answer } from './answer.entity';

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

    @Column()
    createdBy: string

    @CreateDateColumn({type: 'timestamptz'})
    timeCreated: Date
 
    @UpdateDateColumn({type: 'timestamptz'})
    timeModified: Date
    
    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

}
