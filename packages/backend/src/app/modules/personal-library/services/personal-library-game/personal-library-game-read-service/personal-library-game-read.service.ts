import { Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository';
import { PersonalLibraryGameDetailsResponseDto } from '../../../dto/response/personal-library-game/personal-library-game-details.dto';
import { PersonalLibraryGameFiltersDto } from '../../../dto/request/personal-library-game/personal-library-game-filters.dto';
import { PersonalLibraryGameMapService } from '../personal-library-game-map-service/personal-library-game-map.service';

@Injectable()
export class PersonalLibraryGameReadService {
	constructor(
		private readonly personalLibraryGameReadRepository: IPersonalLibraryGameReadRepository,
		private readonly personalLibraryGameMapService: PersonalLibraryGameMapService,
	) {}

	async findById(checksum: string): Promise<PersonalLibraryGameDetailsResponseDto | null> {
		const personalLibraryGame = await this.personalLibraryGameReadRepository.findById(checksum);

		if (!personalLibraryGame) {
			return null;
		}

		return this.personalLibraryGameMapService.toPersonalLibraryGameDetailsDto(personalLibraryGame);
	}

	async findAll(
		userId: string,
		page: number,
		limit: number,
		filters?: PersonalLibraryGameFiltersDto,
		search?: Record<string, unknown>,
		sort?: Record<string, unknown>
	): Promise<Array<PersonalLibraryGameDetailsResponseDto>> {
		const personalLibraryGames = await this.personalLibraryGameReadRepository.findAll(userId, page, limit, filters, search, sort);

		return personalLibraryGames.map(game =>
			this.personalLibraryGameMapService.toPersonalLibraryGameDetailsDto(game)
		);
	}
}

