import { GameDetailsResponseDto } from '../../../dto/response/game/game-details.dto';
import { GameFiltersDto } from '../../../dto/request/game/game-filters.dto';
import { GameMapService } from '../game-map-service/game-map.service';
import { IGameReadRepository } from '../../../repositories/games/abstracts/igame-read.repository';
import { Injectable } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../../../shared/dto/request/pagination/paginate.dto';
import { PaginationMetaDto } from '../../../../../shared/dto/request/pagination/paginate-meta.dto';

@Injectable()
export class GameReadService {
	constructor(
		private readonly gameReadRepository: IGameReadRepository,
		private readonly gameMapService: GameMapService,
	) {}

	async findByIdWithDetails(checksum: string): Promise<GameDetailsResponseDto | null> {
		const game = await this.gameReadRepository.findById(checksum);

		if (!game) {
			return null;
		}

		return this.gameMapService.toGameDetailsDto(game);
	}

	async findAll(page: number, limit: number, filters?: GameFiltersDto, search?: Record<string, unknown>): Promise<PaginatedResponseDto<GameDetailsResponseDto, PaginationMetaDto>> {
		const [games, totalItems] = await Promise.all([
			this.gameReadRepository.findAll(page, limit, filters, search),
			this.gameReadRepository.count(filters, search),
		]);

		const totalPages = Math.ceil(totalItems / limit);

		const meta = new PaginationMetaDto();

		meta.page = page;
		meta.pageSize = limit;
		meta.totalItems = totalItems;
		meta.totalPages = totalPages;
		meta.hasNext = page < totalPages;
		meta.hasPrev = page > 1;

		const data = games.map(game => this.gameMapService.toGameDetailsDto(game));

		return {
			data,
			meta,
		};
	}
}

