import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { AuthModule } from './auth/auth.module';
import { ConfigValidationSchema } from './config.schema';
import {TaskModule} from './tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: ConfigValidationSchema,
    }),
    TaskModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: async(configservice: ConfigService)=>{
        return{
          type: 'postgres',
          host: configservice.get('DB_HOST'),
          port: configservice.get('DB_PORT'),
          username: configservice.get('DB_USERNAME'),
          password: configservice.get('DB_PASSWORD'),
          database: configservice.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true 
        }
      }
    })


    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'DB_TaskManagement',
    //   autoLoadEntities: true,
    //   synchronize: true 
    // })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
