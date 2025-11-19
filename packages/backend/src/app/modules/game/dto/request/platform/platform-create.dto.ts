import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlatformCreateDto {
	@Expose()
	checksum?: string;

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

	constructor(data: {
		checksum?: string;
		platformTypeId: string;
		abbreviation?: string;
		name: string;
		alternativeName: string;
		summary?: string;
	}) {
		this.checksum = data.checksum;
		this.platformTypeId = data.platformTypeId;
		this.abbreviation = data.abbreviation;
		this.name = data.name;
		this.alternativeName = data.alternativeName;
		this.summary = data.summary;
	}
}

