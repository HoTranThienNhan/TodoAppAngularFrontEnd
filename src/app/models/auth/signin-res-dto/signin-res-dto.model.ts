export class SigninResDto {
    data?: {
        email: string;
        accessToken: string;
    };
    message?: string;
    success!: boolean;
}
