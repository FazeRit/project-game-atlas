import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    checksum: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		username: string,
		email: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.username = username;
		this.email = email;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
