import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ScreenshotsResponseDto {
	@Expose()
	checksum: string;

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

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		gameId: string,
		imageId: string,
		height: number | null,
		width: number | null,
		url: string | null,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.gameId = gameId;
		this.imageId = imageId;
		this.height = height || undefined;
		this.width = width || undefined;
		this.url = url || undefined;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

