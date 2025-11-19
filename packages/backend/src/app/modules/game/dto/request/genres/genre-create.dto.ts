import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GenreCreateDto {
	@Expose()
	checksum?: string;

	@Expose()
	name: string;

	@Expose()
	slug: string;

	constructor(data: {
		checksum?: string;
		name: string;
		slug: string;
	}) {
		this.checksum = data.checksum;
		this.name = data.name;
		this.slug = data.slug;
	}
}

