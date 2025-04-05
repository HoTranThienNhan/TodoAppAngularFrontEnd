import { TodoSubtask } from "../todo-subtask/todo-subtask";

export class AddTodoSubtaskDto {
    todoSubtasks!: Array<TodoSubtask>;
    todoTaskId!: string;
}
