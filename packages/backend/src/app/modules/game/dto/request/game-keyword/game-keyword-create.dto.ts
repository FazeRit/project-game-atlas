import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameKeywordCreateDto {
	@Expose()
	checksum?: string;

	@Expose()
	gameId: string;

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

