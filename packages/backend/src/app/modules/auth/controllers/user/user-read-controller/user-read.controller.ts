import { Controller, Get } from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { UserReadService } from '../../../services/user/user-read-service/user-read.service';
import { UserResponseDto } from '../../../dto';
import { ApiResponseDto } from '../../../../../shared/dto/response/api-response.dto';

@Controller('users')
export class UserReadController {
	constructor(private readonly userReadService: UserReadService) {}

	@Get()
	async findById(@GetUser('checksum') userId: string): Promise<ApiResponseDto<UserResponseDto | null>> {
		const data = await this.userReadService.findById(userId);

		const respones = new ApiResponseDto({
			statusCode: 200,
			data,
			timestamp: new Date().toISOString(),
			success: true,
		})

		return respones;
	}
}