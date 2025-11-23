import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserReadRepository } from '../abstracts/iuser-read.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

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

	async getTasteProfile(checksum: string): Promise<Record<string, number>> {
        const user = await this.prisma.user.findUnique({
            where: {
                checksum
            },
            select: {
                tasteVector: true
            }
        });

        if (!user?.tasteVector) {
            throw new NotFoundException(`Not found taste vector of user ${checksum}`);
        }

        return user.tasteVector as Record<string, number>;
    }
}