import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CompanyResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	name: string;

	@Expose()
	slug?: string;

	@Expose()
	country?: number;

	@Expose()
	startDate?: Date;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		name: string,
		slug: string | null,
		country: number | null,
		startDate: Date | null,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.name = name;
		this.slug = slug || undefined;
		this.country = country || undefined;
		this.startDate = startDate || undefined;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

