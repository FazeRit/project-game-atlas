import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    checksum: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

	constructor(
		checksum: string,
		username: string,
		email: string
	) {
		this.checksum = checksum;
		this.username = username;
		this.email = email;
	}
}