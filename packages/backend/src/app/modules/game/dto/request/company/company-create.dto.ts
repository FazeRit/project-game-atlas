import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CompanyCreateDto {
	@Expose()
	checksum?: string;

	@Expose()
	name: string;

	@Expose()
	slug?: string;

	@Expose()
	country?: number;

	@Expose()
	startDate?: Date;

	constructor(data: {
		checksum?: string;
		name: string;
		slug?: string;
		country?: number;
		startDate?: Date;
	}) {
		this.checksum = data.checksum;
		this.name = data.name;
		this.slug = data.slug;
		this.country = data.country;
		this.startDate = data.startDate;
	}
}

