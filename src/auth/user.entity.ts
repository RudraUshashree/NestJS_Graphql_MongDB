import { TaskController } from "src/tasks/tasks.controller";
import { TaskEntity } from "src/tasks/tasks.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany((_type) => TaskEntity, (task) => task.user, {eager: true})
    tasks: TaskEntity[];
}