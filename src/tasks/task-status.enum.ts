// This file name is model.ts at first then it renamed with task-status.enum.ts


// export interface TaskEntity{
//     id: string;
//     title: string;
//     description: string;
//     status: TaskStatus;
// }

export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}