import { IsArray, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator'

export class SearchQuestionDto {
    @IsString()
    @IsOptional()
    readonly textSearch: string

    @IsOptional()
    @IsArray()
    readonly labels: []

    @IsOptional()
    @IsDateString()
    readonly fromDate: Date

    @IsOptional()
    @IsDateString()
    readonly toDate: Date

    @IsOptional()
    @IsEmail()
    readonly email: string
}
