import { Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository';
import { PersonalLibraryGameFiltersDto } from '../../../dto/request/personal-library-game/personal-library-game-filters.dto';
import { PersonalLibraryGameMapService } from '../personal-library-game-map-service/personal-library-game-map.service';
import { PaginatedResponseDto } from '../../../../../shared/dto/request/pagination/paginate.dto';
import { PaginationMetaDto } from '../../../../../shared/dto/request/pagination/paginate-meta.dto';
import { PaginatePersonalLibraryGameResponseDto, PersonalLibraryGameDetailsResponseDto } from '../../../dto';

@Injectable()
export class PersonalLibraryGameReadService {
	constructor(
		private readonly personalLibraryGameReadRepository: IPersonalLibraryGameReadRepository,
		private readonly personalLibraryGameMapService: PersonalLibraryGameMapService,
	) { }

	async findById(checksum: string): Promise<PersonalLibraryGameDetailsResponseDto | null> {
		const personalLibraryGame = await this.personalLibraryGameReadRepository.findById(checksum);

		if (!personalLibraryGame) {
			return null;
		}

		return this.personalLibraryGameMapService.toPersonalLibraryGameDetailsDto(personalLibraryGame);
	}

	async findByUserIdAndGameId(userId: string, gameId: string): Promise<PersonalLibraryGameDetailsResponseDto | null> {
		const personalLibraryGame = await this.personalLibraryGameReadRepository.findByUserIdAndGameId(userId, gameId);

		if (!personalLibraryGame) {
			return null;
		}

		return this.personalLibraryGameMapService.toPersonalLibraryGameDetailsDto(personalLibraryGame);
	}

	async findByUserIdAndId(userId: string, checksum: string): Promise<PersonalLibraryGameDetailsResponseDto | null> {
		const personalLibraryGame = await this.personalLibraryGameReadRepository.findByUserIdAndId(userId, checksum);

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
	): Promise<PaginatedResponseDto<PaginatePersonalLibraryGameResponseDto, PaginationMetaDto>> {
		const [personalLibraryGames, totalItems] = await Promise.all([
			this.personalLibraryGameReadRepository.findAll(userId, page, limit, filters, search, sort),
			this.personalLibraryGameReadRepository.count(userId, filters, search),
		]);

		const totalPages = Math.ceil(totalItems / limit);

		const meta = new PaginationMetaDto();

		meta.page = page;
		meta.pageSize = limit;
		meta.totalItems = totalItems;
		meta.totalPages = totalPages;
		meta.hasNext = page < totalPages;
		meta.hasPrev = page > 1;

		const data = personalLibraryGames.map(
			game => this.personalLibraryGameMapService.toPaginatePersonalLibraryGameDto(game)
		);

		return {
			data,
			meta,
		};
	}

	async exists(
		userId: string,
		gameId: string
	): Promise<boolean> {
		return this.personalLibraryGameReadRepository.exists(userId, gameId);
	}
}
