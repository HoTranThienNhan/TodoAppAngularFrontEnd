import { Tag } from "../tag/tag.model";

export class AllTagsResDto {
    data?: {
        tags: Array<Tag>;
    };
    message?: string;
    success!: boolean;
}
