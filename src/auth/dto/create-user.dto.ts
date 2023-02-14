import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserCreateDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak...Password should contain atleast 1 Number or Special letter, 1 Capital letter and 1 Small letter',
    })
    password: string;
}