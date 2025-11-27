import { GamePlatform } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { IGamePlatformWriteRepository } from '../abstracts';
import { GamePlatformCreateDto } from '../../../../dto/request/game-platform/game-platform-create.dto';
import { GamePlatformUpdateDto } from '../../../../dto/request/game-platform/game-platform-update.dto';

@Injectable()
export class GamePlatformWriteRepository implements IGamePlatformWriteRepository {
	constructor(private readonly prisma: PrismaService) { }

	async create(data: GamePlatformCreateDto): Promise<GamePlatform | null> {
		return this.prisma.gamePlatform.create({
			data
		});
	}

	async createMany(data: Array<GamePlatformCreateDto>): Promise<void> {
		await this.prisma.gamePlatform.createMany({
			data,
			skipDuplicates: true
		});
	}

	async update(checksum: string, data: GamePlatformUpdateDto): Promise<GamePlatform | null> {
		return this.prisma.gamePlatform.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.gamePlatform.delete({
			where: {
				checksum
			}
		});
	}
}

