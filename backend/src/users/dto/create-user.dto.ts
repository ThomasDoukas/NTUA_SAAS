import { IsNotEmpty, IsString, IsEmail, MinLength, IsDate } from 'class-validator'

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10, {
        message: 'Password is too short. Minimal length is $constraint1 characters.',
    })
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly birthday: Date;
}
