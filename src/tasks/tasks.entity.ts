import { Exclude } from "class-transformer";
import { UserEntity } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class TaskEntity{
   @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne((_type)=> UserEntity, (user)=> user.tasks, {eager: false})
    @Exclude({toPlainOnly: true})
    user: UserEntity;
}