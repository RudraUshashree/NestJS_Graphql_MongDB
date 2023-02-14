import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./jwt-strategy";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";


@Module({
    imports: [
        ConfigModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configservice: ConfigService)=>({
                secret: configservice.get('JWT_SECRET'),
                signOptions:{
                    expiresIn: 3600
                }
            })
            // secret: 'topsecret',
            // signOptions:{
            //     expiresIn: 3600
            // }
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService,UserRepository,JWTStrategy],
    exports: [JWTStrategy, PassportModule],
  })
  export class AuthModule{}
  