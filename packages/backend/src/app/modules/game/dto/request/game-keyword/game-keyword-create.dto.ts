import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GameKeywordCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	gameId: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	keywordId: string;

	constructor(data: {
		checksum?: string;
		gameId: string;
		keywordId: string;
	}) {
		this.checksum = data.checksum;
		this.gameId = data.gameId;
		this.keywordId = data.keywordId;
	}
}

