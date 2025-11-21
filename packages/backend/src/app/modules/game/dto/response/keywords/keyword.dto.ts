import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class KeywordResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	name: string;

	@Expose()
	slug: string;

	@Expose()
	url?: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		name: string,
		slug: string,
		url: string | null,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.name = name;
		this.slug = slug;
		this.url = url || undefined;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

