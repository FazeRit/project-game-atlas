export interface IResetPasswordRequestDto {
    email: string;
    code: string;
    newPassword: string;
}