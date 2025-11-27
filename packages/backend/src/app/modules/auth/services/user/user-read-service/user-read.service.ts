import { Injectable } from '@nestjs/common';
import { IUserReadRepository } from '../../../repositories/user/abstracts/iuser-read.repository';
import { User } from '@prisma/client';
import { UserResponseDto } from '../../../dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserReadService {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
	) {}

	async findById(checksum: string): Promise<UserResponseDto | null> {
		const user = await this.userReadRepository.findById(checksum);
		
		if (!user) {
			return null;
		}

		return plainToInstance(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userReadRepository.findByEmail(email);
	}

	async getTasteProfile(userId: string): Promise<Record<string, number>>{
		return this.userReadRepository.getTasteProfile(userId);
	}
}

