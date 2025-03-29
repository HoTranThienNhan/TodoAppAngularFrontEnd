export class RefreshTokenResDto {
    data?: {
        accessToken: string;
    };
    message?: string;
    success!: boolean;
}
