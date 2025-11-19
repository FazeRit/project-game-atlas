import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CompanyUpdateDto {
	@Expose()
	name?: string;

	@Expose()
	slug?: string;

	@Expose()
	country?: number;

	@Expose()
	startDate?: Date;

	constructor(partial: Partial<CompanyUpdateDto>) {
		Object.assign(this, partial);
	}
}

