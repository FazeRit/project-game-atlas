import igdb from 'igdb-api-node';
import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { Injectable, Logger } from '@nestjs/common';
import { PlatformCreateDto } from '../../../game/dto/request/platform/platform-create.dto';
import { PlatformWriteService } from '../../../game/services/platforms/platform/platform-write-service/platform-write.service';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class PlatformsSeeder {
    private readonly clientId: string;
    private readonly accessToken: string;

    private readonly logger = new Logger(PlatformsSeeder.name);

    private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    private readonly LIMIT: number = 500;

    private readonly PLATFORM_TYPE_CHECKSUM_PREFIX: string = '123e4567-e89b-12d3-a456-42661417600';

    constructor(
		private readonly platformWriteService: PlatformWriteService,
		private readonly envService: EnvService
	) {
			this.clientId = this.envService.get(EnvEnum.IGDB_CLIENT_ID);
			this.accessToken = this.envService.get(EnvEnum.IGDB_ACCESS_TOKEN);
	}

	async seed() {
		this.logger.log(`${this.prefix} Starting platforms seeding...`);
		const platforms = await this.getData();

		const batchSize = 500;
		let processedCount = 0;

		for (let i = 0; i < platforms.length; i += batchSize) {
			const batch = platforms.slice(i, i + batchSize);

			const platformDtos: Array<PlatformCreateDto> = batch.map(platform => new PlatformCreateDto({
				checksum: platform.checksum,
				platformTypeId: this.PLATFORM_TYPE_CHECKSUM_PREFIX + platform.platform_type,
				abbreviation: platform.abbreviation || undefined,
				name: platform.name,
				alternativeName: platform.alternative_name || '',
				summary: platform.summary || undefined,
			}));

			try {
				await this.platformWriteService.createMany(platformDtos);
			} catch (error: unknown) {
				const prismaError = error as { code?: string; meta?: { target?: string[] }; message?: string };
				this.logger.error(`${this.prefix} Failed to create platforms batch`, {
					batchStart: i + 1,
					batchEnd: i + batch.length,
					errorCode: prismaError.code,
					errorMessage: prismaError.message,
					error: error,
				});
				throw error;
			}

			processedCount += batch.length;
		}

		this.logger.log(`${this.prefix} ✅ Seeded ${processedCount} platforms`);
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
                    .fields('checksum,platform_type,abbreviation,name,alternative_name,summary')
                    .limit(this.LIMIT)
                    .offset(offset)
                    .request('platforms');

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

                this.logger.error(`${this.prefix} Error fetching platforms from IGDB`, {
                    offset,
                    message: err.message || String(error),
                    error: error,
                });
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        return allData;
    }
}
