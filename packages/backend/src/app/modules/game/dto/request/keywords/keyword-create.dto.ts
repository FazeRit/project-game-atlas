import { Exclude, Expose } from 'class-transformer';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl
} from 'class-validator';

@Exclude()
export class KeywordCreateDto {
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

	@IsOptional()
	@IsUrl()
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

