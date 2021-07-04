import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Users'})
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    // @Column({unique: true})
    @Column()
    username: string

    @Column()
    firstName: string 

    @Column()
    lastName: string

    @Column({unique: true})
    email: string

    @Column()
    birthday: Date

    @Column()
    password: string

}
