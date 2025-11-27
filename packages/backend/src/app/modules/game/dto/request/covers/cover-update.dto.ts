import { Exclude, Expose } from 'class-transformer';
import {
	IsInt,
	IsOptional,
	IsString,
	IsUrl,
	Min
} from 'class-validator';

@Exclude()
export class CoverUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	gameId?: string;

	@IsOptional()
	@IsString()
	@Expose()
	imageId?: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Expose()
	height?: number;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Expose()
	width?: number;

	@IsOptional()
	@IsUrl()
	@Expose()
	url?: string;

	constructor(partial: Partial<CoverUpdateDto>) {
		Object.assign(this, partial);
	}
}