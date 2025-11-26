import { Injectable, Logger } from '@nestjs/common';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';
import { GamePlatformCreateDto } from '../../../game/dto/request/game-platform/game-platform-create.dto';
import { PlatformReadService } from '../../../game/services/platforms/platform/platform-read-service/platform-read.service';
import { GamePlatformsWriteService } from '../../../game/services/platforms/game-platforms/game-platforms-write-service/game-platforms-write.service';

@Injectable()
export class GamePlatformsSeeder {
	private readonly logger = new Logger(GamePlatformsSeeder.name);
	private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    constructor(
		private readonly gamePlatformsWriteService: GamePlatformsWriteService,
		private readonly platformReadService: PlatformReadService
	) {}

	async seed(gameId: string, platformIds: string | Array<string>) {
		if (!platformIds) {
			return;
		}

		const idsArray = Array.isArray(platformIds) ? platformIds : [platformIds];

		if (idsArray.length === 0) {
			return;
		}

		const existingPlatformIds: string[] = [];
		const missingPlatformIds: string[] = [];

		for (const platformId of idsArray) {
			const platform = await this.platformReadService.findById(platformId);
			if (platform) {
				existingPlatformIds.push(platformId);
			} else {
				missingPlatformIds.push(platformId);
			}
		}

		if (missingPlatformIds.length > 0) {
			this.logger.warn(`${this.prefix} GameId: ${gameId}, missing platform checksums in database: ${missingPlatformIds.join(', ')}`);
		}

		if (existingPlatformIds.length === 0) {
			this.logger.warn(`${this.prefix} GameId: ${gameId}, no valid platforms found, skipping`);
			return;
		}

		try {
			if (existingPlatformIds.length === 1) {
				const gamePlatformDto = new GamePlatformCreateDto({
					gameId,
					platformId: existingPlatformIds[0],
				});
				await this.gamePlatformsWriteService.create(gamePlatformDto);
			} else {
				const gamePlatformDtos: Array<GamePlatformCreateDto> = existingPlatformIds.map(platformId => {
					return new GamePlatformCreateDto({
						gameId,
						platformId,
					});
				});
				await this.gamePlatformsWriteService.createMany(gamePlatformDtos);
			}
		} catch (error: unknown) {
			const platformIdsStr = existingPlatformIds.length === 1 ? existingPlatformIds[0] : existingPlatformIds.join(', ');
			this.logger.error(`${this.prefix} gameId: ${gameId}, platformIds: ${platformIdsStr}`);
		}
	}
}
