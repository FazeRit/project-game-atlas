import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserCreateDto {
	@Expose()
	username: string;

	@Expose()
	email: string;

	@Expose()
	hashedPassword: string;

	constructor(data: {
        username: string,
        email: string,
        hashedPassword: string
    }) {
        this.username = data.username;
        this.email = data.email;
        this.hashedPassword = data.hashedPassword;
    }
}