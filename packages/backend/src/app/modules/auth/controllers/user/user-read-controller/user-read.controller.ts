import { Controller, Get } from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { UserReadService } from '../../../services/user/user-read-service/user-read.service';
import { UserResponseDto } from '../../../dto';

@Controller('users')
export class UserReadController {
	constructor(private readonly userReadService: UserReadService) {}

	@Get()
	async findById(@GetUser('checksum') userId: string): Promise<UserResponseDto | null> {
		return this.userReadService.findById(userId);
	}
}