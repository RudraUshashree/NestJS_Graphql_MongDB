import { IsEnum } from "class-validator";
import { TaskStatus } from "src/tasks/task-status.enum";

export class UpdateTaskDto{
    @IsEnum(TaskStatus)
    status: TaskStatus;
}