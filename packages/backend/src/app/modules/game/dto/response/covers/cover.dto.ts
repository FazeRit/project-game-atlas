import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CoverResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	gameId: string;

	@Expose()
	imageId: string;

	@Expose()
	height: number;

	@Expose()
	width: number;

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
		height: number,
		width: number,
		url: string | null,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.imageId = imageId;
		this.gameId = gameId;
		this.height = height;
		this.width = width;
		this.url = url || undefined;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
