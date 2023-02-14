import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { stringify } from "querystring";
import { UserEntity } from "src/auth/user.entity";
import { FilterTaskDto } from "src/tasks/dto/filter-task.dto";
import { DataSource, Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { TaskEntity } from "./tasks.entity";


@Injectable()
export class TaskRepository extends Repository<TaskEntity>{
    private logger = new Logger('TaskRepository');
    constructor(private datasource: DataSource){
        super(TaskEntity,datasource.createEntityManager())
    }

    //Get All Tasks According to Search and Status
    async getFilterTasks(filterdto : FilterTaskDto, user: UserEntity): Promise<TaskEntity[]>{
        // console.log("filter...",JSON.stringify(filterdto ));
        
        const {status, search} = filterdto;
        const query = this.createQueryBuilder('tasks');
        query.where({ user })
        
        if(status){
            query.andWhere('tasks.status = :status',{status});           
        }

        if(search){
            query.andWhere('(LOWER(tasks.title) LIKE LOWER(:search) OR LOWER(tasks.description) LIKE LOWER(:search))',{search: `%${search}%`});
        }

        try{
            const tasks = await query.getMany();
            return tasks;
        }catch(error){
            this.logger.error(`Failed to get tasks  for user ${user.username}. Filters: ${JSON.stringify(filterdto)}`,error.stack);
            throw new InternalServerErrorException();
        }       
    }
}