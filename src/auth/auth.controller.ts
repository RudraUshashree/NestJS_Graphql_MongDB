import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserCreateDTO } from "./dto/create-user.dto";
import { LoginUserDTO } from "./dto/login-user.dto";
import { UserEntity } from "./user.entity";


@Controller('auth')
export class AuthController{
    constructor(private authservice: AuthService){}

    @Post('/register')
    registerUser(@Body() usercreatedto : UserCreateDTO): Promise<UserEntity>{
        return this.authservice.registerUser(usercreatedto);
    }

    @Post('/login')
    loginUser(@Body() loginuserdto : LoginUserDTO): Promise<{accessToken: string}>{
        return this.authservice.loginUser(loginuserdto);
    }

}