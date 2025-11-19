import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class KeywordCreateDto {
	@Expose()
	checksum?: string;

	@Expose()
	name: string;

	@Expose()
	slug: string;

	@Expose()
	url?: string;

	constructor(data: {
		checksum?: string;
		name: string;
		slug: string;
		url?: string;
	}) {
		this.checksum = data.checksum;
		this.name = data.name;
		this.slug = data.slug;
		this.url = data.url;
	}
}

