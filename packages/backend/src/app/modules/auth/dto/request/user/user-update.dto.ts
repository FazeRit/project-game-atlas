import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserUpdateDto {
    @Expose()
    username?: string;

    @Expose()
    email?: string;

    @Expose()
    password?: string;

    constructor(partial: Partial<UserUpdateDto>) {
        Object.assign(this, partial);
    }
}