import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
//import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { FilterTaskDto } from "src/tasks/dto/filter-task.dto";
import { TaskRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./tasks.entity";
import { UserEntity } from "src/auth/user.entity";


@Injectable()
export class TaskService{

    constructor(@InjectRepository(TaskRepository) 
                private taskrepository : TaskRepository){}
        
    //Get All Tasks
    async AllTasks() : Promise<TaskEntity[]>{
        return this.taskrepository.find()
    }

    //Get All Tasks According to Search and Status

    GetFilterTask(filterdto : FilterTaskDto, user: UserEntity) : Promise<TaskEntity[]>{
       return this.taskrepository.getFilterTasks(filterdto, user);
    }


    //Get Task by ID

    async getTaskByID(id: string,  user: UserEntity) : Promise<TaskEntity>{
        const dataFound = await this.taskrepository.findOne({where:{id, user}})

         //If data not found
        if(!dataFound){
            throw new NotFoundException(`${id} ID Task is Not Exists...`);
        }
        return dataFound;
    }

    //Add Task

    async createTask(createtaskdto : CreateTaskDto, user: UserEntity) : Promise<TaskEntity>{
        const{title,description} = createtaskdto;
        const addtask = this.taskrepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });

        await this.taskrepository.save(addtask);
        return addtask;
    }

    //Delete Task

    async deleteTask(id: string, user: UserEntity) : Promise<string>{
        const data = await this.taskrepository.delete({id, user});
        
        if(data.affected === 0){
            throw new NotFoundException(`${id} Task is Not Found...`);
        }
        else{
            return `${id} ID Task is deleted...`;
        }
        
    }

    //Update Task
    async updateTask(id: string, status: TaskStatus, user: UserEntity,): Promise<TaskEntity>{
        const task = await this.getTaskByID(id, user);
        
        task.status = status;

        await this.taskrepository.save(task);
        return task;
    }

   
    // private taskArr : TaskEntity[] = [];

    // //Get All Tasks
    // getAllTasks() : TaskEntity[]{
    //     return this.taskArr;
    // }

    // //Get Task According to Search and Status
    // GetFilterTask(filterdto : FilterTaskDto) : TaskEntity[]{
    //     const {status, search} = filterdto;

    //     let alltasks = this.getAllTasks();

    //     if(status){
    //         alltasks = alltasks.filter((t) => t.status === status);
    //     }

    //     if(search){
    //         alltasks = alltasks.filter((t) => {
    //             if(t.title.includes(search) || t.description.includes(search)){
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }

    //     return alltasks;
    // }

    // //Add Task
    // AddTask(createtaskdto : CreateTaskDto) : TaskEntity{
    //     const {title, description} = createtaskdto;
    //     const newtask : TaskEntity = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }
    //     this.taskArr.push(newtask);
    //     return newtask;
    // }

    // //Find by ID
    // FindByID(id: string) : TaskEntity{
    //     const dataFound =  this.taskArr.find((t) => t.id === id);

    //     //If data not found
    //     if(!dataFound){
    //         throw new NotFoundException(`${id} ID Task is Not Exists...`);
    //     }

    //     return dataFound;
    // }

    // //Delete Task by ID
    // deleteTask(id: string) : string{
    //     const dataFound = this.FindByID(id);
    //     this.taskArr = this.taskArr.filter((t) => t.id !== dataFound.id);
    //     return "Task deleted..."
    // }

    // //Update Task
    // updateTaskStatus(id: string, status: TaskStatus) : TaskEntity{
    //     const task = this.FindByID(id);
    //     task.status = status;
    //     return task;
    // }
}