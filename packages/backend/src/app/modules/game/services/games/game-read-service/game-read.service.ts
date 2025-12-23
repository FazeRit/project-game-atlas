import { GameDetailsResponseDto } from '../../../dto/response/game/game-details.dto';
import { GameFiltersDto } from '../../../dto/request/game/game-filters.dto';
import { IGameReadRepository } from '../../../repositories/games/abstracts/igame-read.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedResponseDto } from '../../../../../shared/dto/request/pagination/paginate.dto';
import { PaginationMetaDto } from '../../../../../shared/dto/request/pagination/paginate-meta.dto';
import { PaginateGameResponseDto } from '../../../dto';
import { GameMapService } from '../game-map-service/game-map.service';
import { RedisService } from '../../../../redis/redis.service';

@Injectable()
export class GameReadService {
	constructor(
		private readonly redisService: RedisService,
		private readonly gameReadRepository: IGameReadRepository,
		private readonly gameMapService: GameMapService,
	) { }

	async findById(
		checksum: string,
		userId?: string
	): Promise<GameDetailsResponseDto | null> {
		const game = await this.gameReadRepository.findById(
			checksum,
			userId,
		);

		if (!game) {
			return null;
		}

		return this.gameMapService.toGameDetailsDto(
			game,
		);
	}

	async findAll(
		page: number,
		limit: number,
		filters?: GameFiltersDto,
		search?: Record<string, unknown>,
		sort?: Record<string, unknown>
	): Promise<PaginatedResponseDto<PaginateGameResponseDto, PaginationMetaDto>> {
		const [games, totalItems] = await Promise.all([
			this.gameReadRepository.findAll(page, limit, filters, search, sort),
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

		const data = games.map(
			game => this.gameMapService.toPaginateGameDto(game)
		);

		return {
			data,
			meta,
		};
	}

	async getGameVector(checksum: string): Promise<Record<string, number>> {
		const cacheKey = `game-vector:${checksum}`;
		const cachedVector = await this.redisService.get<Record<string, number>>(cacheKey);

		if (cachedVector) {
			return cachedVector;
		}

		const game = await this.gameReadRepository.findById(checksum);

		if (!game) {
			throw new NotFoundException(`Game with id ${checksum} not found`);
		}

		const dnaVector: Record<string, number> = {};

		if (game.gameGenres && Array.isArray(game.gameGenres)) {
			game.gameGenres.forEach(gameGenre => {
				if (gameGenre.genre?.slug) {
					dnaVector[gameGenre.genre.slug] = 10;
				}
			});
		}

		if (game.gameKeywords && Array.isArray(game.gameKeywords)) {
			game.gameKeywords.forEach(gameKeyword => {
				if (gameKeyword.keyword?.slug) {
					dnaVector[gameKeyword.keyword.slug] = 10;
				}
			});
		}

		await this.redisService.set(cacheKey, dnaVector, 24 * 60 * 60 * 1000);

		return dnaVector;
	}
}
