import { IsNumber, IsString } from "class-validator"

export class CreateLabelDto {
    @IsString()
    readonly labelTitle: string

    @IsNumber()
    readonly questionId: number

}
