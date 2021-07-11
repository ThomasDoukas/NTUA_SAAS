import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsString()
    @IsNotEmpty()
    readonly body: string

    @IsEmail()
    @IsNotEmpty()
    readonly createdBy: string

    @IsArray()
    @IsOptional()
    readonly labels: []

}
