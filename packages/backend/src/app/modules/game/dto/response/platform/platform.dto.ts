import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlatformResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	platformTypeId: string;

	@Expose()
	abbreviation?: string;

	@Expose()
	name: string;

	@Expose()
	alternativeName: string;

	@Expose()
	summary?: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		platformTypeId: string,
		abbreviation: string | null,
		name: string,
		alternativeName: string,
		summary: string | null,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.platformTypeId = platformTypeId;
		this.abbreviation = abbreviation || undefined;
		this.name = name;
		this.alternativeName = alternativeName;
		this.summary = summary || undefined;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

