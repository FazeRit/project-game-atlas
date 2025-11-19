import igdb from 'igdb-api-node';
import { CoverCreateDto } from '../../../game/dto/request/covers/cover-create.dto';
import { CoversWriteService } from '../../../game/services/covers/covers-write-service/covers-write.service';
import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { GameReadService } from '../../../game/services/game/game-read-service/game-read.service';
import { Injectable, Logger } from '@nestjs/common';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class CoversSeeder {
    private readonly clientId: string;
    private readonly accessToken: string;

    private readonly logger = new Logger(CoversSeeder.name);

    private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    private readonly LIMIT: number = 500;

    constructor(
		private readonly coversWriteService: CoversWriteService,
		private readonly gameReadService: GameReadService,
		private readonly envService: EnvService
	) {
			this.clientId = this.envService.get(EnvEnum.IGDB_CLIENT_ID);
			this.accessToken = this.envService.get(EnvEnum.IGDB_ACCESS_TOKEN);
	}

	async seed() {
		this.logger.log(`${this.prefix} Starting covers seeding...`);
		const covers = await this.getData();

		const batchSize = 500;
		let processedCount = 0;

		for (let i = 0; i < covers.length; i += batchSize) {
			const batch = covers.slice(i, i + batchSize);
			
			const validCoverDtos: Array<CoverCreateDto> = [];

			for (const cover of batch) {
				const gameChecksum = this.extractGameChecksum(cover.game);
				if (!gameChecksum) {
					continue;
				}

				const game = await this.gameReadService.findById(gameChecksum);
				if (!game) {
					this.logger.warn(`${this.prefix} Cover ${cover.checksum}: game ${gameChecksum} not found in database, skipping`);
					continue;
				}

				validCoverDtos.push(new CoverCreateDto({
					checksum: cover.checksum,
					gameId: gameChecksum,
					imageId: cover.image_id || '',
					height: cover.height || undefined,
					width: cover.width || undefined,
					url: cover.url || undefined,
				}));
			}

			if (validCoverDtos.length === 0) {
				continue;
			}

			try {
				await this.coversWriteService.createMany(validCoverDtos);
			} catch (error: unknown) {
				const prismaError = error as { code?: string; meta?: { target?: string[] }; message?: string };
				this.logger.error(`${this.prefix} Failed to create covers batch`, {
					batchStart: i + 1,
					batchEnd: i + batch.length,
					errorCode: prismaError.code,
					errorMessage: prismaError.message,
					error: error,
				});
				throw error;
			}

			processedCount += validCoverDtos.length;
		}

		this.logger.log(`${this.prefix} ✅ Seeded ${processedCount} covers`);
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
                    .request('covers');

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

                this.logger.error(`${this.prefix} Error fetching covers from IGDB`, {
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

