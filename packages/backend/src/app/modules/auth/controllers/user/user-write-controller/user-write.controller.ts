import {
    Body,
    Controller,
    Delete,
    Put
} from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { UserResponseDto, UserUpdateDto } from '../../../dto';
import { UserWriteService } from '../../../services/user/user-write-service/user-write.service';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';

@Controller('users')
export class UserWriteController {
	constructor(
		private readonly userWriteService: UserWriteService,
	) {}

	@Put()
	async update(
        @GetUser('checksum') userId: string,
        @Body() data: UserUpdateDto,
    ): Promise<UserResponseDto> {
		return this.userWriteService.update(userId, data);
	}

	@Delete()
	async delete(
        @GetUser('checksum') userId: string,
    ): Promise<ApiResponseDto<null>> {
		await this.userWriteService.delete(userId);

		const response = new ApiResponseDto({
			statusCode: 200,
			data: null,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return response;
	}
}

