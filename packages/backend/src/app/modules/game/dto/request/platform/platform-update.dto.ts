import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlatformUpdateDto {
	@Expose()
	platformTypeId?: string;

	@Expose()
	abbreviation?: string;

	@Expose()
	name?: string;

	@Expose()
	alternativeName?: string;

	@Expose()
	summary?: string;

	constructor(partial: Partial<PlatformUpdateDto>) {
		Object.assign(this, partial);
	}
}

