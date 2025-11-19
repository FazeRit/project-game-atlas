import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameKeywordUpdateDto {
	@Expose()
	gameId?: string;

	@Expose()
	keywordId?: string;

	constructor(partial: Partial<GameKeywordUpdateDto>) {
		Object.assign(this, partial);
	}
}

