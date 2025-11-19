import igdb from 'igdb-api-node';
import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { GameReadService } from '../../../game/services/game/game-read-service/game-read.service';
import { Injectable, Logger } from '@nestjs/common';
import { ScreenshotsCreateDto } from '../../../game/dto/request/screenshots/screenshots-create.dto';
import { ScreenshotsWriteService } from '../../../game/services/screenshots/screenshots-write-service/screenshots-write.service';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class ScreenshotsSeeder {
    private readonly clientId: string;
    private readonly accessToken: string;

    private readonly logger = new Logger(ScreenshotsSeeder.name);

    private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    private readonly LIMIT: number = 500;

    constructor(
		private readonly screenshotsWriteService: ScreenshotsWriteService,
		private readonly gameReadService: GameReadService,
		private readonly envService: EnvService
	) {
			this.clientId = this.envService.get(EnvEnum.IGDB_CLIENT_ID);
			this.accessToken = this.envService.get(EnvEnum.IGDB_ACCESS_TOKEN);
	}

	async seed() {
		this.logger.log(`${this.prefix} Starting screenshots seeding...`);
		const screenshots = await this.getData();

		const batchSize = 500;
		let processedCount = 0;

		for (let i = 0; i < screenshots.length; i += batchSize) {
			const batch = screenshots.slice(i, i + batchSize);

			const validScreenshotDtos: Array<ScreenshotsCreateDto> = [];

			for (const screenshot of batch) {
				const gameChecksum = this.extractGameChecksum(screenshot.game);
				if (!gameChecksum) {
					continue;
				}

				const game = await this.gameReadService.findById(gameChecksum);
				if (!game) {
					this.logger.warn(`${this.prefix} Screenshot ${screenshot.checksum}: game ${gameChecksum} not found in database, skipping`);
					continue;
				}

				validScreenshotDtos.push(new ScreenshotsCreateDto({
					checksum: screenshot.checksum,
					gameId: gameChecksum,
					imageId: screenshot.image_id || '',
					height: screenshot.height || undefined,
					width: screenshot.width || undefined,
					url: screenshot.url || undefined,
				}));
			}

			if (validScreenshotDtos.length === 0) {
				continue;
			}

			try {
				await this.screenshotsWriteService.createMany(validScreenshotDtos);
			} catch (error: unknown) {
				const prismaError = error as { code?: string; meta?: { target?: string[] }; message?: string };
				this.logger.error(`${this.prefix} Failed to create screenshots batch`, {
					batchStart: i + 1,
					batchEnd: i + batch.length,
					errorCode: prismaError.code,
					errorMessage: prismaError.message,
					error: error,
				});
				throw error;
			}

			processedCount += validScreenshotDtos.length;
		}

		this.logger.log(`${this.prefix} ✅ Seeded ${processedCount} screenshots`);
	}

	async getData() {
        let hasMore = true;
        let offset = 0;
        const allData = [];

        while(hasMore) {
            try {
                const {
                    data
                } = await igdb(this.clientId, this.accessToken)
                    .fields('checksum,game.checksum,image_id,height,width,url')
                    .limit(this.LIMIT)
                    .offset(offset)
                    .request('screenshots');

                if (data.length === 0) {
                    hasMore = false;
                    break;
                }

                allData.push(...data);

                if (data.length < this.LIMIT) {
                    hasMore = false;
                } else {
                    offset += this.LIMIT;
                }
            } catch (error: unknown) {
                const err = error as { response?: { status?: number; data?: unknown; headers?: unknown }; code?: number; message?: string; stack?: string };
                if (err.response?.status === 429 || err.code === 429) {
                    this.logger.warn(`${this.prefix} Rate limit exceeded, waiting...`);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    continue;
                }

                this.logger.error(`${this.prefix} Error fetching screenshots from IGDB`, {
                    offset,
                    message: err.message || String(error),
                    error: error,
                });
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        return allData;
    }

	private extractGameChecksum(game: number | string | { checksum: string } | null | undefined): string | null {
		if (!game) {
			return null;
		}
		if (typeof game === 'object' && game !== null && 'checksum' in game) {
			return game.checksum;
		}
		return null;
	}
}

