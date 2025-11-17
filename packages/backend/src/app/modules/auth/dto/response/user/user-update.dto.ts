import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserUpdateDto {
    @Expose()
    username?: string;

    @Expose()
    email?: string;

    @Expose()
    hashedPassword?: string;

    constructor(partial: Partial<UserUpdateDto>) {
        Object.assign(this, partial);
    }
}