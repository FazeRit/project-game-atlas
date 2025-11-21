import {
	Controller,
	Get,
	Param,
	Query
} from '@nestjs/common';
import { GameDetailsResponseDto } from '../../../dto/response/game/game-details.dto';
import { GameFiltersDto } from '../../../dto/request/game/game-filters.dto';
import { GamePaginateDto } from '../../../dto/request/game/game-paginate.dto';
import { GameReadService } from '../../../services/games/game-read-service/game-read.service';
import { PaginatedResponseDto } from '../../../../../shared/dto/request/pagination/paginate.dto';
import { PaginationMetaDto } from '../../../../../shared/dto/request/pagination/paginate-meta.dto';
import { Public } from '../../../../../shared/decorators/public.decorator';
import { SearchParams } from '../../../../../shared/decorators/pagination/search-params.decorator';
import { SortParams } from '../../../../../shared/decorators/pagination/sort-params.decorator';

@Controller('games')
export class GameReadController {
	constructor(private readonly gameReadService: GameReadService) {}

	@Public()
	@Get(':checksum')
	async findById(@Param('checksum') checksum: string): Promise<GameDetailsResponseDto | null> {
		return this.gameReadService.findByIdWithDetails(checksum);
	}

	@Public()
	@Get()
	async findAll(
		@Query() paginateDto: GamePaginateDto,
		@Query() filtersDto: GameFiltersDto,
		@SearchParams(['name']) search?: Record<string, unknown>,
		@SortParams(['createdAt', 'updatedAt', 'name', 'totalRating', 'totalRatingCount']) sort?: Record<string, unknown>,
	): Promise<PaginatedResponseDto<GameDetailsResponseDto, PaginationMetaDto>> {
		const filters = new GameFiltersDto({
			genres: filtersDto?.genres,
			keywords: filtersDto?.keywords,
		});

		return this.gameReadService.findAll(
			paginateDto.page,
			paginateDto.limit,
			filters,
			search,
			sort
		);
	}
}