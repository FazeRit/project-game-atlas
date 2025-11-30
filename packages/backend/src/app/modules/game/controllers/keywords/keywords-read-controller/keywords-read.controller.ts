import {
	Controller,
	Get,
	HttpStatus,
	Query,
} from '@nestjs/common';
import { Public } from '../../../../../shared/decorators/public.decorator';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';
import { KeywordResponseDto } from '../../../dto';
import { KeywordsReadService } from '../../../services/keywords/keywords/keywords-read-service/keywords-read.service';
import { KeywordPaginateDto } from '../../../dto/request/keywords/keyword-paginate.dto';
import { SearchParams } from '../../../../../shared/decorators/pagination/search-params.decorator';

@Controller('keywords')
export class KeywordsReadController {
	constructor(private readonly keywordsReadServce: KeywordsReadService) { }

	@Public()
	@Get()
	async findAll(
		@Query() paginateDto: KeywordPaginateDto,
		@SearchParams(['name']) search?: Record<string, unknown>,
	): Promise<ApiResponseDto<Array<KeywordResponseDto>>> {
		const {
			data,
			meta,
		} = await this.keywordsReadServce.findAll(
			paginateDto.page,
			paginateDto.limit
		);

		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data,
			timestamp: new Date().toISOString(),
			success: true,
			path: '',
			meta,
		})

		return response;
	}
}