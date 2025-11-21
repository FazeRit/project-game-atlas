import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUserReadRepository } from '../../../repositories/user/abstracts/iuser-read.repository';
import { IUserWriteRepository } from '../../../repositories/user/abstracts/iuser-write.repository';
import { plainToInstance } from 'class-transformer';
import { UserCreateDto } from '../../../dto/request/user/user-create.dto';
import { UserResponseDto } from '../../../dto';
import { UserUpdateDto } from '../../../dto/request/user/user-update.dto';

@Injectable()
export class UserWriteService {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly userWriteRepository: IUserWriteRepository,
	) {}

	async create(data: UserCreateDto): Promise<UserResponseDto> {
		const existingUser = await this.userReadRepository.findByUsernameOrEmail(data.username, data.email);

		if (existingUser) {
			throw new BadRequestException('User already exists');
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		const newUser = await this.userWriteRepository.create({
			...data,
			password: hashedPassword,
		});

		if (!newUser) {
			throw new InternalServerErrorException('Failed to create user');
		}

		return plainToInstance(UserResponseDto, newUser, {
			excludeExtraneousValues: true,
		});
	}

	async update(checksum: string, data: UserUpdateDto): Promise<UserResponseDto> {
		const updateData = {
			...data,
		};

		if (updateData.password) {
			updateData.password = await bcrypt.hash(updateData.password, 10);
		}

		const updatedUser = await this.userWriteRepository.update(checksum, updateData);

		if (!updatedUser) {
			throw new BadRequestException('User not found');
		}

		return plainToInstance(UserResponseDto, updatedUser, {
			excludeExtraneousValues: true,
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.userWriteRepository.delete(checksum);
	}

	async createMany(data: Array<UserCreateDto>): Promise<void> {
		const usersWithHashedPasswords = await Promise.all(
			data.map(async (user) => ({
				...user,
				password: await bcrypt.hash(user.password, 10),
			}))
		);

		await this.userWriteRepository.createMany(usersWithHashedPasswords);
	}
}

