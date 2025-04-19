import { User } from "../../user/user.model";

export class UserResDto {
        data?: User;
        message?: string;
        success!: boolean;
}
