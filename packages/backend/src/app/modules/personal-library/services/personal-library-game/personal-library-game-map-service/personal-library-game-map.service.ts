import { GameMapService } from '../../../../game/services/games/game-map-service/game-map.service';
import { Injectable } from '@nestjs/common';
import { PersonalLibraryGameDetailsResponseDto } from '../../../dto/response/personal-library-game/personal-library-game-details.dto';
import { PersonalLibraryGameWithDetails } from '../../../types/personal-library-game/personal-library-game-with-details.type';

@Injectable()
export class PersonalLibraryGameMapService {
	constructor(private readonly gameMapService: GameMapService) {}

	toPersonalLibraryGameDetailsDto(
		personalLibraryGame: PersonalLibraryGameWithDetails
	): PersonalLibraryGameDetailsResponseDto {
		const gameDetailsDto = this.gameMapService.toGameDetailsDto(personalLibraryGame.game);

		return new PersonalLibraryGameDetailsResponseDto(
			personalLibraryGame.checksum,
			personalLibraryGame.gameId,
			personalLibraryGame.personalLibraryId,
			personalLibraryGame.status,
			personalLibraryGame.rank,
			personalLibraryGame.createdAt,
			personalLibraryGame.updatedAt,
			gameDetailsDto,
			personalLibraryGame.note ?? undefined
		);
	}
}

