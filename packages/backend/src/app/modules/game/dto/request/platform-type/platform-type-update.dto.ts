import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class PlatformTypeUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	name?: string;

	constructor(partial: Partial<PlatformTypeUpdateDto>) {
		Object.assign(this, partial);
	}
}

