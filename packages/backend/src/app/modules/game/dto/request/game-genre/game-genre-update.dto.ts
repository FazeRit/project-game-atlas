import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameGenreUpdateDto {
	@Expose()
	gameId?: string;

	@Expose()
	genreId?: string;

	constructor(partial: Partial<GameGenreUpdateDto>) {
		Object.assign(this, partial);
	}
}

