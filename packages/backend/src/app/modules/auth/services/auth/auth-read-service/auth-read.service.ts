import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserReadRepository } from '../../../repositories/user/abstracts/iuser-read.repository';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../../../dto';

@Injectable()
export class AuthReadService {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
	) {}

	async validateUser(email: string, password: string)  : Promise<UserResponseDto> {
		const user = await this.userReadRepository.findByUsernameOrEmail(
			"",
			email
		);

		if (!user) {
			throw new UnauthorizedException('Invalid email');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password');
		}

		const response = plainToInstance(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});

		return response;
	}
}