import { BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity';
import { Label } from './label.entity';

@Entity({name: 'Questions'})
export class Question {
    @PrimaryGeneratedColumn()
    questionId: number

    @Column()
    title: string

    @Column()
    body: string

    // createdBy email? 
    @Column()
    createdBy: string

    @CreateDateColumn()
    timeCreated: Date

    @CreateDateColumn()
    timeModified: Date

    @BeforeUpdate()
    updateModTime() {
        this.timeModified = new Date;
    }
    
    @Column({default: false})
    closed: boolean
    
    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];
    
    @ManyToMany(type => Label, label => label.questions, {cascade: ['insert', 'update']})
    @JoinTable({name: 'Question_has_Labels'})
    labels: Label[];

    // More ideas up-voters(like labels)

}
