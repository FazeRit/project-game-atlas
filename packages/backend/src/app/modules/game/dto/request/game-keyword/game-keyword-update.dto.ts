import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class GameKeywordUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	gameId?: string;

	@IsOptional()
	@IsString()
	@Expose()
	keywordId?: string;

	constructor(partial: Partial<GameKeywordUpdateDto>) {
		Object.assign(this, partial);
	}
}

