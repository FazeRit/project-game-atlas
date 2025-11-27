import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    checksum: string;

    @Expose()
    email: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		email: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.email = email;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
