import {
    Body,
    Controller,
    Delete,
    Put
} from '@nestjs/common';
import { GetUser } from '../../../../../shared/decorators/get-user.decorator';
import { UserResponseDto, UserUpdateDto } from '../../../dto';
import { UserWriteService } from '../../../services/user/user-write-service/user-write.service';

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
    ): Promise<void> {
		return this.userWriteService.delete(userId);
	}
}

