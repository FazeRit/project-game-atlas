import { Exclude, Expose, Type } from 'class-transformer';
import {
	IsDate,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	Max,
	Min
} from 'class-validator';

@Exclude()
export class GameCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	name: string;

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

	constructor(data: {
		checksum?: string;
		name: string;
		summary?: string;
		storyline?: string;
		totalRating?: number;
		totalRatingCount?: number;
		url?: string;
		firstReleaseDate?: Date;
	}) {
		this.checksum = data.checksum;
		this.name = data.name;
		this.summary = data.summary;
		this.storyline = data.storyline;
		this.totalRating = data.totalRating;
		this.totalRatingCount = data.totalRatingCount;
		this.url = data.url;
		this.firstReleaseDate = data.firstReleaseDate;
	}
}

