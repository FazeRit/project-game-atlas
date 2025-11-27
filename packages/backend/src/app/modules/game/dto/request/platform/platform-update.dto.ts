import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class PlatformUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	platformTypeId?: string;

	@IsOptional()
	@IsString()
	@Expose()
	abbreviation?: string;

	@IsOptional()
	@IsString()
	@Expose()
	name?: string;

	@IsOptional()
	@IsString()
	@Expose()
	alternativeName?: string;

	@IsOptional()
	@IsString()
	@Expose()
	summary?: string;

	constructor(partial: Partial<PlatformUpdateDto>) {
		Object.assign(this, partial);
	}
}

