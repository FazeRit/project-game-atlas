import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Query,
} from '@nestjs/common';
import { GameDetailsResponseDto } from '../../../dto/response/game/game-details.dto';
import { GameFiltersDto } from '../../../dto/request/game/game-filters.dto';
import { GamePaginateDto } from '../../../dto/request/game/game-paginate.dto';
import { GameReadService } from '../../../services/games/game-read-service/game-read.service';
import { Public } from '../../../../../shared/decorators/public.decorator';
import { SearchParams } from '../../../../../shared/decorators/pagination/search-params.decorator';
import { SortParams } from '../../../../../shared/decorators/pagination/sort-params.decorator';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';
import { PaginationMetaDto } from '../../../../../shared/dto/request/pagination/paginate-meta.dto';
import { PaginateGameResponseDto } from '../../../dto';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { UserResponseDto } from '../../../../auth/dto';

@Controller('games')
export class GameReadController {
	constructor(private readonly gameReadService: GameReadService) {}

	@Public()
	@Get(':checksum')
	async findById(
		@GetUser() user: UserResponseDto,
		@Param('checksum') checksum: string
	): Promise<ApiResponseDto<GameDetailsResponseDto | null>> {
		const data = await this.gameReadService.findById(
			checksum,
			user.checksum
		);

		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return response;
	}

	@Public()
	@Get()
	async findAll(
		@Query() paginateDto: GamePaginateDto,
		@Query() filtersDto: GameFiltersDto,
		@SearchParams(['name']) search?: Record<string, unknown>,
		@SortParams(['createdAt', 'updatedAt', 'name', 'totalRating', 'totalRatingCount']) sort?: Record<string, unknown>,
	): Promise<ApiResponseDto<Array<PaginateGameResponseDto>, PaginationMetaDto>> {
		const filters = new GameFiltersDto({
			genres: filtersDto?.genres,
			keywords: filtersDto?.keywords,
		});

		const {
			data,
			meta
		} = await this.gameReadService.findAll(
			paginateDto.page,
			paginateDto.limit,
			filters,
			search,
			sort
		);

		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data,
			timestamp: new Date().toISOString(),
			success: true,
			path: '',
			meta
		})

		return response;
	}
}