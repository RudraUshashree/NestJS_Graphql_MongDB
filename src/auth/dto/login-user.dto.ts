import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";


export class LoginUserDTO{
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