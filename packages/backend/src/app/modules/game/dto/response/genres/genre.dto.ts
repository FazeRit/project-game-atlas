import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GenreResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	name: string;

	@Expose()
	slug: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		name: string,
		slug: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.name = name;
		this.slug = slug;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

