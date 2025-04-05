import { TodoTask } from "../todo-task/todo-task.model";

export class UpdateTodoTaskResDto {
    data?: TodoTask;
    message?: string;
    success!: boolean;
}
