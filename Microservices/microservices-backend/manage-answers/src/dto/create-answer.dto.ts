import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    readonly body: string

    @IsEmail()
    @IsNotEmpty()
    readonly createdBy: string

    @IsNumber()
    @IsNotEmpty()
    readonly questionId: number 
}
