import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserCreateDTO } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity>{
    constructor(private datasource : DataSource){
        super(UserEntity, datasource.createEntityManager())
    }

    async registerUser(usercreatedto: UserCreateDTO): Promise<UserEntity>{
        
        const {username, email, password} = usercreatedto;
        const salt = await bcrypt.genSalt();
        const hassedPassword = await bcrypt.hash(password, salt);
        // console.log('salt====',salt);
        // console.log('password====',hassedPassword);  

        try{
            const adduser = this.create({
                username,
                email,
                password: hassedPassword
            });
            const user = await this.save(adduser);
            return user;
        }catch(error){
            // console.log(error.code);
            if(error.code === '23505'){
                throw new ConflictException('Email ID already exists...');
            }else{
                throw new InternalServerErrorException();
            }            
        }                         
    }
}