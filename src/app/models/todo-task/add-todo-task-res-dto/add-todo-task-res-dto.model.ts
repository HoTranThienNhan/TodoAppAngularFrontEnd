import { TodoTask } from "../todo-task/todo-task.model";

export class AddTodoTaskResDto {
    data?: TodoTask;
    message?: string;
    success!: boolean;
}
