import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserReadService } from '../../user/user-read-service/user-read.service';
import { UserResponseDto } from '../../../dto';

@Injectable()
export class AuthReadService {
	constructor(
		private readonly userReadService: UserReadService,
	) {}

	async validateUser(email: string, password: string): Promise<UserResponseDto> {
		const user = await this.userReadService.findByUsernameOrEmail('', email);

		if (!user) {
			throw new UnauthorizedException('Invalid email');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password');
		}

		return plainToInstance(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});
	}
}