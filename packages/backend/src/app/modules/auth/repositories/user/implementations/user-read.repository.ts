import { Injectable } from '@nestjs/common';
import { IUserReadRepository } from '../abstracts/iuser-read.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserReadRepository implements IUserReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				checksum
			}
		})
	}

	async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				OR: [
					{
						username
					},
					{
						email
					}
				]
			}
		})
	}
}