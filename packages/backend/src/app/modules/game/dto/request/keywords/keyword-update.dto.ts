import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, IsUrl } from 'class-validator';

@Exclude()
export class KeywordUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	name?: string;

	@IsOptional()
	@IsString()
	@Expose()
	slug?: string;

	@IsOptional()
	@IsUrl()
	@Expose()
	url?: string;

	constructor(partial: Partial<KeywordUpdateDto>) {
		Object.assign(this, partial);
	}
}

