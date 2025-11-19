import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlatformTypeResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	name: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		name: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.name = name;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

