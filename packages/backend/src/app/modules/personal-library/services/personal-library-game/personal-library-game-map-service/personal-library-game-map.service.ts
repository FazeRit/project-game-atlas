import { GameMapService } from '../../../../game/services/games/game-map-service/game-map.service';
import { Injectable } from '@nestjs/common';
import { TPaginatePersonalLibraryGameDto, TPersonalLibraryGameWithDetails } from '../../../types/personal-library-game/personal-library-game-with-details.type';
import { PaginatePersonalLibraryGameResponseDto } from '../../../dto/response/personal-library-game/paginate-personal-library-game.dto';
import { PersonalLibraryGameDetailsResponseDto } from '../../../dto';

@Injectable()
export class PersonalLibraryGameMapService {
	constructor(private readonly gameMapService: GameMapService) { }

	toPaginatePersonalLibraryGameDto(
		personalLibraryGame: TPaginatePersonalLibraryGameDto
	): PaginatePersonalLibraryGameResponseDto {
		const gameDto = this.gameMapService.toPaginateGameDto(personalLibraryGame.game);

		return new PaginatePersonalLibraryGameResponseDto({
			checksum: personalLibraryGame.checksum,
			gameId: personalLibraryGame.gameId,
			personalLibraryId: personalLibraryGame.personalLibraryId,
			status: personalLibraryGame.status,
			rank: personalLibraryGame.rank,
			createdAt: personalLibraryGame.createdAt,
			updatedAt: personalLibraryGame.updatedAt,
			note: personalLibraryGame.note ?? undefined,
			game: gameDto,
		});
	}

	toPersonalLibraryGameDetailsDto(
		personalLibraryGame: TPersonalLibraryGameWithDetails
	): PersonalLibraryGameDetailsResponseDto {
		const gameDto = this.gameMapService.toGameDetailsDto(personalLibraryGame.game);

		return new PersonalLibraryGameDetailsResponseDto({
			checksum: personalLibraryGame.checksum,
			gameId: personalLibraryGame.gameId,
			personalLibraryId: personalLibraryGame.personalLibraryId,
			status: personalLibraryGame.status,
			rank: personalLibraryGame.rank,
			createdAt: personalLibraryGame.createdAt,
			updatedAt: personalLibraryGame.updatedAt,
			note: personalLibraryGame.note ?? undefined,
			game: gameDto,
		});
	}
}
