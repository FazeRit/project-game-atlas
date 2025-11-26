import { GamePlatform } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { IGamePlatformReadRepository } from '../abstracts';

@Injectable()
export class GamePlatformReadRepository implements IGamePlatformReadRepository {
	constructor(private readonly prisma: PrismaService) { }

	async findById(checksum: string): Promise<GamePlatform | null> {
		return this.prisma.gamePlatform.findUnique({
			where: {
				checksum
			}
		});
	}
}

