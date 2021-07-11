import { IsDate, IsEmail, IsNumber, IsString } from "class-validator"

export class ContributionDto {
    @IsNumber()
    readonly year: number

    @IsNumber()
    readonly month: number

    @IsEmail()
    readonly email: string
}
