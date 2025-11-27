import { Exclude, Expose, Type } from 'class-transformer';
import {
	IsDate,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	Max,
	Min
} from 'class-validator';

@Exclude()
export class GameUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	name?: string;

	@IsOptional()
	@IsString()
	@Expose()
	summary?: string;

	@IsOptional()
	@IsString()
	@Expose()
	storyline?: string;

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(100)
	@Expose()
	totalRating?: number;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Expose()
	totalRatingCount?: number;

	@IsOptional()
	@IsUrl()
	@Expose()
	url?: string;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@Expose()
	firstReleaseDate?: Date;

	constructor(partial: Partial<GameUpdateDto>) {
		Object.assign(this, partial);
	}
}

