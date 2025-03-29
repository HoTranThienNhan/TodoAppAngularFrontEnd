export class RegisterResDto {
    data?: {
        firstName: string;
        lastName: string;
        username: string;
        phone: string;
        email: string;
        password: string;
        otpText: string;
    };
    message?: string;
    success!: boolean;
}
