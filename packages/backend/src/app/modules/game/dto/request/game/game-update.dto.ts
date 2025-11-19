import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameUpdateDto {
	@Expose()
	name?: string;

	@Expose()
	summary?: string;

	@Expose()
	storyline?: string;

	@Expose()
	totalRating?: number;

	@Expose()
	totalRatingCount?: number;

	@Expose()
	url?: string;

	@Expose()
	firstReleaseDate?: Date;

	constructor(partial: Partial<GameUpdateDto>) {
		Object.assign(this, partial);
	}
}

