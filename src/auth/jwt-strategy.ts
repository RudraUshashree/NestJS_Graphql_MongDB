import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){

    constructor(@InjectRepository(UserRepository)
                private userrepository: UserRepository,private configservice: ConfigService){
                    super({
                        secretOrKey: configservice.get('JWT_SECRET'),
                        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    });
                }

    async validate(payload: JwtPayload): Promise<UserEntity>{
        const {email} = payload;
        const user: UserEntity = await this.userrepository.findOne({where:{email}});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}