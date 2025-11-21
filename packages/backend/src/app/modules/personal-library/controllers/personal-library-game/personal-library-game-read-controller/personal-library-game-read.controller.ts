import { Controller, Get, Query } from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibraryGameDetailsResponseDto } from '../../../dto/response/personal-library-game/personal-library-game-details.dto';
import { PersonalLibraryGameFiltersDto } from '../../../dto/request/personal-library-game/personal-library-game-filters.dto';
import { PersonalLibraryGamePaginateDto } from '../../../dto/request/personal-library-game/personal-library-game-paginate.dto';
import { PersonalLibraryGameReadService } from '../../../services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service';
import { SearchParams } from '../../../../../shared/decorators/pagination/search-params.decorator';
import { SortParams } from '../../../../../shared/decorators/pagination/sort-params.decorator';

@Controller('personal-library-games')
export class PersonalLibraryGameReadController {
	constructor(
		private readonly personalLibraryGameReadService: PersonalLibraryGameReadService,
	) {}

	@Get()
	async findAll(
		@GetUser('checksum') userId: string,
		@Query() paginateDto: PersonalLibraryGamePaginateDto,
		@Query() filtersDto: PersonalLibraryGameFiltersDto,
		@SearchParams(['game.name', 'note']) search?: Record<string, unknown>,
		@SortParams(['createdAt', 'updatedAt', 'status', 'rank', 'game.name', 'game.totalRating', 'game.totalRatingCount']) sort?: Record<string, unknown>,
	): Promise<Array<PersonalLibraryGameDetailsResponseDto>> {
		const filters = new PersonalLibraryGameFiltersDto({
			status: filtersDto?.status,
			rank: filtersDto?.rank,
			genres: filtersDto?.genres,
			keywords: filtersDto?.keywords,
		});

		return this.personalLibraryGameReadService.findAll(userId, paginateDto.page, paginateDto.limit, filters, search, sort);
	}
}