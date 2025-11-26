import { BadRequestException, Injectable } from '@nestjs/common';
import { GamePlatform } from '@prisma/client';
import { IGamePlatformWriteRepository } from '../../../../repositories/platforms/game-platform/abstracts';
import { GamePlatformCreateDto } from '../../../../dto/request/game-platform/game-platform-create.dto';
import { GamePlatformUpdateDto } from '../../../../dto/request/game-platform/game-platform-update.dto';
import { GamePlatformsReadService } from '../game-platforms-read-service/game-platforms-read.service';

@Injectable()
export class GamePlatformsWriteService {
	constructor(
		private readonly gamePlatformReadService: GamePlatformsReadService,
		private readonly gamePlatformWriteRepository: IGamePlatformWriteRepository,
	) {}

	async create(data: GamePlatformCreateDto): Promise<GamePlatform> {
		const gameKeyword = await this.gamePlatformWriteRepository.create(data);

		if (!gameKeyword) {
			throw new BadRequestException('Failed to create game keyword');
		}

		return gameKeyword;
	}

	async update(checksum: string, data: GamePlatformUpdateDto): Promise<GamePlatform> {
		const existingGameKeyword = await this.gamePlatformReadService.findById(checksum);

		if (!existingGameKeyword) {
			throw new BadRequestException('Game keyword not found');
		}

		const updatedGameKeyword = await this.gamePlatformWriteRepository.update(checksum, data);

		if (!updatedGameKeyword) {
			throw new BadRequestException('Failed to update game keyword');
		}

		return updatedGameKeyword;
	}

	async delete(checksum: string): Promise<void> {
		const existingGameKeyword = await this.gamePlatformReadService.findById(checksum);

		if (!existingGameKeyword) {
			throw new BadRequestException('Game keyword not found');
		}

		await this.gamePlatformWriteRepository.delete(checksum);
	}

	async createMany(data: Array<GamePlatformCreateDto>): Promise<void> {
		await this.gamePlatformWriteRepository.createMany(data);
	}
}

