import { TodoTask } from "../todo-task/todo-task.model";

export class AllTodoTasksResDto {
    data?: Array<TodoTask>;
    message?: string;
    success!: boolean;
}
