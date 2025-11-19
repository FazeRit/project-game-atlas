import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ScreenshotsUpdateDto {
	@Expose()
	gameId?: string;

	@Expose()
	imageId?: string;

	@Expose()
	height?: number;

	@Expose()
	width?: number;

	@Expose()
	url?: string;

	constructor(partial: Partial<ScreenshotsUpdateDto>) {
		Object.assign(this, partial);
	}
}

