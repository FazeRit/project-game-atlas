import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GenreCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	name: string;

	@IsString()
	@IsNotEmpty()
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

