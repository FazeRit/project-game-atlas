import igdb from 'igdb-api-node';
import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { Injectable, Logger } from '@nestjs/common';
import { PlatformTypeCreateDto } from '../../../game/dto/request/platform-type/platform-type-create.dto';
import { PlatformTypeWriteService } from '../../../game/services/platforms/platform-type/platform-type-write-service/platform-type-write.service';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class PlatformTypesSeeder {
    private readonly clientId: string;
    private readonly accessToken: string;

    private readonly logger = new Logger(PlatformTypesSeeder.name);

    private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    private readonly LIMIT: number = 500;

    constructor(
		private readonly platformTypeWriteService: PlatformTypeWriteService,
		private readonly envService: EnvService
	) {
			this.clientId = this.envService.get(EnvEnum.IGDB_CLIENT_ID);
			this.accessToken = this.envService.get(EnvEnum.IGDB_ACCESS_TOKEN);
	}

	async seed() {
		this.logger.log(`${this.prefix} Starting platform types seeding...`);
		const platformTypes = await this.getData();

		const batchSize = 500;
		let processedCount = 0;

		for (let i = 0; i < platformTypes.length; i += batchSize) {
			const batch = platformTypes.slice(i, i + batchSize);
			
			const platformTypeDtos: Array<PlatformTypeCreateDto> = batch.map(platformType => new PlatformTypeCreateDto(platformType));

			try {
				await this.platformTypeWriteService.createMany(platformTypeDtos);
			} catch (error: unknown) {
				const prismaError = error as { code?: string; meta?: { target?: string[] }; message?: string };
				this.logger.error(`${this.prefix} Failed to create platform types batch`, {
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

		this.logger.log(`${this.prefix} ✅ Seeded ${processedCount} platform types`);
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
                    .fields('checksum,name')
                    .limit(this.LIMIT)
                    .offset(offset)
                    .request('platform_types');

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

                this.logger.error(`${this.prefix} Error fetching platform types from IGDB`, {
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
