import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibraryGameFiltersDto } from '../../../dto/request/personal-library-game/personal-library-game-filters.dto';
import { PersonalLibraryGamePaginateDto } from '../../../dto/request/personal-library-game/personal-library-game-paginate.dto';
import { PersonalLibraryGameReadService } from '../../../services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service';
import { SearchParams } from '../../../../../shared/decorators/pagination/search-params.decorator';
import { SortParams } from '../../../../../shared/decorators/pagination/sort-params.decorator';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';
import { PaginationMetaDto } from '../../../../../shared/dto/request/pagination/paginate-meta.dto';
import { PaginatePersonalLibraryGameResponseDto } from '../../../dto';

@Controller('personal-library-games')
export class PersonalLibraryGameReadController {
	constructor(
		private readonly personalLibraryGameReadService: PersonalLibraryGameReadService,
	) { }

	@Get()
	async findAll(
		@GetUser('checksum') userId: string,
		@Query() paginateDto: PersonalLibraryGamePaginateDto,
		@Query() filtersDto: PersonalLibraryGameFiltersDto,
		@SearchParams(['game.name', 'note']) search?: Record<string, unknown>,
		@SortParams(['createdAt', 'updatedAt', 'status', 'rank', 'game.name', 'game.totalRating', 'game.totalRatingCount']) sort?: Record<string, unknown>,
	): Promise<ApiResponseDto<Array<PaginatePersonalLibraryGameResponseDto>, PaginationMetaDto>> {
		const filters = new PersonalLibraryGameFiltersDto({
			status: filtersDto?.status,
			rank: filtersDto?.rank,
			genres: filtersDto?.genres,
			keywords: filtersDto?.keywords,
		});

		const {
			data,
			meta
		} = await this.personalLibraryGameReadService.findAll(
			userId,
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

	@Get('exists')
    async exists(
        @GetUser('checksum') userId: string, 
        @Query('gameId') gameId: string,
    ): Promise<ApiResponseDto<boolean>> {
        const data = await this.personalLibraryGameReadService.exists(userId, gameId);

        const response = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data,
            timestamp: new Date().toISOString(),
            success: true,
            path: '',
        });

        return response;
    }
}