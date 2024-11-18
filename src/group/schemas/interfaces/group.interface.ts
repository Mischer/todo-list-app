import { Task } from '../../../task/schemas/task.schema';

export interface IGroupWithTasks extends IGroup {
    tasks: Task[];
}

export interface IGroup {
    id: string;
    name: string;
    description: string;
}