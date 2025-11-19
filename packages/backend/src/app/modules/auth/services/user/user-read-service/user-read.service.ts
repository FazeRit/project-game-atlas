import { Injectable } from '@nestjs/common';
import { IUserReadRepository } from '../../../repositories/user/abstracts/iuser-read.repository';
import { plainToInstance } from 'class-transformer';
import { User } from '@prisma/client';
import { UserResponseDto } from '../../../dto';

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

	async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
		return this.userReadRepository.findByUsernameOrEmail(username, email);
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userReadRepository.findByUsernameOrEmail('', email);
	}

	async findByIdWithPassword(checksum: string): Promise<User | null> {
		return this.userReadRepository.findById(checksum);
	}

	async findByEmailWithPassword(email: string): Promise<User | null> {
		return this.userReadRepository.findByUsernameOrEmail('', email);
	}
}

