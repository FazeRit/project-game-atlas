import { Exclude, Expose } from 'class-transformer';
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	Min
} from 'class-validator';

@Exclude()
export class ScreenshotsCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	gameId: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	imageId: string;

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

	constructor(data: {
		checksum?: string;
		gameId: string;
		imageId: string;
		height?: number;
		width?: number;
		url?: string;
	}) {
		this.checksum = data.checksum;
		this.gameId = data.gameId;
		this.imageId = data.imageId;
		this.height = data.height;
		this.width = data.width;
		this.url = data.url;
	}
}

