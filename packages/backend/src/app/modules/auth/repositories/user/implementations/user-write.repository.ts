import { Injectable } from '@nestjs/common';
import { IUserWriteRepository } from '../abstracts/iuser-write.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserCreateDto } from '../../../dto/request/user/user-create.dto';
import { UserUpdateDto } from '../../../dto/request/user/user-update.dto';

@Injectable()
export class UserWriteRepository implements IUserWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: UserCreateDto): Promise<User | null> {
		return this.prisma.user.create({
			data
		});
	}

	async update(checksum: string, data: UserUpdateDto): Promise<User | null> {
		return this.prisma.user.update({
			where: {
				checksum
			},
			data
		})
	}

	async updateByEmail(email: string, data: UserUpdateDto): Promise<User> {
		return this.prisma.user.update({
			where: {
				email
			},
			data
		})
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.user.delete({
			where: {
				checksum
			}
		})
	}

	async createMany(data: Array<UserCreateDto>): Promise<void> {
		await this.prisma.user.createMany({
			data,
			skipDuplicates: true
		});
	}
}