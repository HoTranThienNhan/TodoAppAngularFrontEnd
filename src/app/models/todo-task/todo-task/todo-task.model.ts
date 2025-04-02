import { Tag } from "../../tag/tag/tag.model";

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
    todoSubTasks!: []
}
