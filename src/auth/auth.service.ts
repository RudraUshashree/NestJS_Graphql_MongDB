import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDTO } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService{
    constructor(@InjectRepository(UserRepository) 
                private userrepository : UserRepository,
                private Jwtservice: JwtService){}
 
    //Register User
    registerUser(usercreatedto : UserCreateDTO): Promise<UserEntity>{
        return this.userrepository.registerUser(usercreatedto);
    }

    //Login User
    async loginUser(loginuserdto : LoginUserDTO): Promise<{accessToken: string}>{
        const{email, password} = loginuserdto;

        const user = await this.userrepository.findOne({where:{email}})

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = {email};
            const accessToken: string = await this.Jwtservice.sign(payload);
            return {accessToken}
        }else{
            throw new UnauthorizedException('Invalid email or password')
        }

    }
}