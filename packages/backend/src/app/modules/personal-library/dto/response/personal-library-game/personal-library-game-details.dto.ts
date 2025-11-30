import { Exclude, Expose, Type } from 'class-transformer';
import { GameDetailsResponseDto } from '../../../../game/dto/response/game/game-details.dto';
import { PersonalLibraryGameResponseDto } from './personal-library-game.dto';
import { EPlayStatus, ETierRank } from '@prisma/client';

@Exclude()
export class PersonalLibraryGameDetailsResponseDto extends PersonalLibraryGameResponseDto {
	@Expose()
	@Type(() => GameDetailsResponseDto)
	game: GameDetailsResponseDto;

	constructor(
		data: {
			checksum: string,
			gameId: string,
			personalLibraryId: string,
			status: EPlayStatus,
			rank: ETierRank,
			createdAt: Date,
			updatedAt: Date,
			note?: string,
			game: GameDetailsResponseDto
		}
	) {
		super(data);
		this.game = data.game;
	}
}