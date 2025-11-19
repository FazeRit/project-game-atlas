import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ScreenshotsCreateDto {
	@Expose()
	checksum?: string;

	@Expose()
	gameId: string;

	@Expose()
	imageId: string;

	@Expose()
	height?: number;

	@Expose()
	width?: number;

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

