import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class GameGenreUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	gameId?: string;

	@IsOptional()
	@IsString()
	@Expose()
	genreId?: string;

	constructor(partial: Partial<GameGenreUpdateDto>) {
		Object.assign(this, partial);
	}
}

