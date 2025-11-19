import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonalLibraryResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	userId: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		userId: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.userId = userId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

