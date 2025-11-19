import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameGenreCreateDto {
	@Expose()
	checksum?: string;

	@Expose()
	gameId: string;

	@Expose()
	genreId: string;

	constructor(data: {
		checksum?: string;
		gameId: string;
		genreId: string;
	}) {
		this.checksum = data.checksum;
		this.gameId = data.gameId;
		this.genreId = data.genreId;
	}
}

