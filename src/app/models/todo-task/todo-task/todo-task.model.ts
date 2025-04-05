import { Tag } from "../../tag/tag/tag.model";
import { TodoSubtask } from "../../todo-subtask/todo-subtask/todo-subtask";

export class TodoTask {
    id!: string;
    name!: string;
    description!: string;
    date!: string;
    isImportant!: boolean;
    isDone!: boolean;
    isDeleted!: boolean;
    userId!: string;
    createdAt!: string;
    tags!: Array<Tag>;
    todoSubTasks!: Array<TodoSubtask>;
}
