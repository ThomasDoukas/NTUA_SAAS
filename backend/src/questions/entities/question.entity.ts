import { type } from "node:os";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";
import { Label } from "./label.entity";

@Entity({name: "Questions"})
export class Question {
    @PrimaryGeneratedColumn()
    questionId: number

    @Column()
    title: string

    @Column()
    body: string

    // createdBy userId or email? 
    @Column()
    createdBy: string

    @Column()
    timeCreatedBy: Date

    // @Column()
    // modifiedBy: string

    // @Column()
    // timeModifiedBy: Date

    // use different database for Labels? 
    @Column()
    label: string

    @Column()
    closed: boolean

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

    @OneToMany(type => Label, label => label.question)
    labels: Label[];
}
