import {
	Controller,
	Delete,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { PersonalLibraryWriteService } from '../../../services/personal-library/personal-library-write-service/personal-library-write.service';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';

@Controller('personal-libraries')
export class PersonalLibraryWriteController {
	constructor(
		private readonly personalLibraryWriteService: PersonalLibraryWriteService,
	) {}

	@Post()
	async create(
        @GetUser('checksum') userId: string,
    ): Promise<ApiResponseDto<void>> {
		await this.personalLibraryWriteService.create({
			userId
		});

		const response = new ApiResponseDto({
			statusCode: HttpStatus.CREATED,
			data: undefined,
			timestamp: new Date().toISOString(),
			success: true,
		})
		
		return response;
	}

	@Delete()
	async delete(
        @GetUser('checksum') userId: string,
    ): Promise<ApiResponseDto<void>> {
		await this.personalLibraryWriteService.delete(userId);
	
		const response = new ApiResponseDto({
			statusCode: HttpStatus.OK,
			data: undefined,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return response;
	}
}

