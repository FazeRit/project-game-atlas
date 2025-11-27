import { GamePlatform } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IGamePlatformReadRepository } from '../../../../repositories/platforms/game-platform/abstracts';

@Injectable()
export class GamePlatformsReadService {
	constructor(
		private readonly gamePlatformsReadRepository: IGamePlatformReadRepository,
	) {}

	async findById(checksum: string): Promise<GamePlatform | null> {
		return this.gamePlatformsReadRepository.findById(checksum);
	}
}