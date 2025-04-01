import { Tag } from "../tag/tag.model";

export class AddTagResDto {
    data?: Tag;
    message?: string;
    success!: boolean;
}
