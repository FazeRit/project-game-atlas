export interface IUser {
    checksum: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserResponseDto extends IUser {}