import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "src/tasks/task-status.enum";


export class FilterTaskDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;                          // ? means optional
               
    @IsOptional()
    @IsString()
    search?: string;
}