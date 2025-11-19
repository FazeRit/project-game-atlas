import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CoverUpdateDto {
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

	constructor(partial: Partial<CoverUpdateDto>) {
		Object.assign(this, partial);
	}
}