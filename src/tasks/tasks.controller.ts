import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorators";
import { UserEntity } from "src/auth/user.entity";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { FilterTaskDto } from "src/tasks/dto/filter-task.dto";
import { UpdateTaskDto } from "src/tasks/dto/update-task.dto";
import { TaskStatus } from "./task-status.enum";
import { TaskEntity } from "./tasks.entity";
import { TaskService } from "./tasks.service";


@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController{
    private logger = new Logger('TaskController');
    constructor(private taskService: TaskService){}

    //Get All Tasks
    @Get()
    AllTasks(): Promise<TaskEntity[]>{
        return this.taskService.AllTasks();
    }
    
    //Get All Tasks According to Search and Status
    @Get('/filter')
    getTasks(@Query() filterdto : FilterTaskDto, @GetUser() user: UserEntity) : Promise<TaskEntity[]>{
        this.logger.verbose(`User ${user.username} retrieving all Tasks...Filters${JSON.stringify(filterdto)}`)
        return this.taskService.GetFilterTask(filterdto, user);  
    }

    //Get Task By ID

    @Get('/:id')
    getTaskByID(@Param('id') id: string, @GetUser() user: UserEntity): Promise<TaskEntity>{
        return this.taskService.getTaskByID(id, user);
    }

    @Post('/add')
    createTask(@Body() createtaskdto : CreateTaskDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity>{
        return this.taskService.createTask(createtaskdto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string,  @GetUser() user: UserEntity): Promise<string>{
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id:string,
    @Body() updatetaskdto:UpdateTaskDto,
    @GetUser() user: UserEntity
    ) : Promise<TaskEntity>{
        const {status} = updatetaskdto;
        return this.taskService.updateTask(id, status, user);
    }







    // @Get()
    // getTasks(@Query() filterdto : FilterTaskDto) : TaskEntity[] {
    //     // console.log(Object.keys(filterdto).length);
        
    //     if(Object.keys(filterdto).length){
    //         return this.taskService.GetFilterTask(filterdto);       //Get task according to status and search
    //     }
    //     else{
    //         return this.taskService.getAllTasks();     //Get all tasks
    //     }
    // }

    // @Post('/add')
    // AddTask(@Body() createtaskdto : CreateTaskDto) : TaskEntity{
    //     return this.taskService.AddTask(createtaskdto);
    // }   

    // @Get('/:id')
    // FindByID(@Param('id') id:string) : TaskEntity{
    //     return this.taskService.FindByID(id);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string) : string{
    //     return this.taskService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // UpdateTask(
    //     @Param('id') id : string,
    //     @Body() updatetaskdto : UpdateTaskDto,
    // ) : TaskEntity{
    //     const {status} = updatetaskdto;
    //     return this.taskService.updateTaskStatus(id,status);
    // } 
}