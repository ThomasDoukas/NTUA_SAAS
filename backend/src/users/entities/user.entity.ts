import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    username: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    birthday: Date

    @Column()
    password: string

    // Will add questions, answers, userType(reward system -> accepted questions)
}
