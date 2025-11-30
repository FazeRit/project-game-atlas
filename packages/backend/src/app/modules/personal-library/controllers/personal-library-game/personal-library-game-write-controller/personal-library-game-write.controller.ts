import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	Post,
	Put,
	Query
} from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';
import { PersonalLibraryGameWriteService } from '../../../services/personal-library-game/personal-library-game-write-service/personal-library-game-write.service';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';

@Controller('personal-library-games')
export class PersonalLibraryGameWriteController {
	constructor(
		private readonly personalLibraryGameWriteService: PersonalLibraryGameWriteService,
	) {}

	@Post()
	async create(
        @GetUser('checksum') userId: string,
        @Body() data: PersonalLibraryGameCreateDto,
    ): Promise<ApiResponseDto<void>> {
		await this.personalLibraryGameWriteService.create(userId, data);

		const response = new ApiResponseDto({
			statusCode: HttpStatus.CREATED,
			data: undefined,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return response;
	}

	@Put()
	async update(
        @GetUser('checksum') userId: string,
        @Body() data: PersonalLibraryGameUpdateDto,
    ): Promise<ApiResponseDto<void>> {
		await this.personalLibraryGameWriteService.update(userId, data);
	
		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data: undefined,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return response;
	}

	@Delete(':checksum')
	async delete(
        @GetUser('checksum') userId: string,
        @Query('checksum') checksum: string,
    ): Promise<ApiResponseDto<void>> {
		await this.personalLibraryGameWriteService.delete(userId, checksum);
	
		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data: undefined,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return response;
	}
}