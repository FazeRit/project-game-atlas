import {
	Controller,
	Get,
	HttpStatus,
} from '@nestjs/common';
import { Public } from '../../../../../shared/decorators/public.decorator';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';
import { GenreResponseDto } from '../../../dto';
import { GenreReadService } from '../../../services/genres/genres/genres-read-service/genre-read.service';

@Controller('genres')
export class GenreReadController {
	constructor(private readonly genreReadService: GenreReadService) { }

	@Public()
	@Get()
	async findAll(): Promise<ApiResponseDto<Array<GenreResponseDto>>> {
		const data = await this.genreReadService.findAll(
		);

		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data,
			timestamp: new Date().toISOString(),
			success: true,
			path: '',
		})

		return response;
	}
}