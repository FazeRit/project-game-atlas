import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GameGenreCreateDto {
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

