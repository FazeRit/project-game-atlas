import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class GenreUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	name?: string;

	@IsOptional()
	@IsString()
	@Expose()
	slug?: string;

	constructor(partial: Partial<GenreUpdateDto>) {
		Object.assign(this, partial);
	}
}

