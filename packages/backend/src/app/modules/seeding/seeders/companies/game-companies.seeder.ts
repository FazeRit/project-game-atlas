import igdb from 'igdb-api-node';
import { CompanyReadService } from '../../../game/services/companies/company/company-read-service/company-read.service';
import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { GameCompanyCreateDto } from '../../../game/dto/request/game-company/game-company-create.dto';
import { GameCompanyWriteService } from '../../../game/services/companies/game-company/game-company-write-service/game-company-write.service';
import { GameReadService } from '../../../game/services/games/game-read-service/game-read.service';
import { IgdbInvolvedCompany } from './types/igdb-involved-company.interface';
import { Injectable, Logger } from '@nestjs/common';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class GameCompaniesSeeder {
    private readonly clientId: string;
    private readonly accessToken: string;

    private readonly logger = new Logger(GameCompaniesSeeder.name);

    private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    private readonly LIMIT: number = 500;

    constructor(
		private readonly gameCompanyWriteService: GameCompanyWriteService,
		private readonly gameReadService: GameReadService,
		private readonly companyReadService: CompanyReadService,
		private readonly envService: EnvService
	) {
			this.clientId = this.envService.get(EnvEnum.IGDB_CLIENT_ID);
			this.accessToken = this.envService.get(EnvEnum.IGDB_ACCESS_TOKEN);
	}

	async seed() {
		this.logger.log(`${this.prefix} Starting game companies seeding...`);
		const gameCompanies = await this.getData();

		const batchSize = 500;
		let processedCount = 0;

		for (let i = 0; i < gameCompanies.length; i += batchSize) {
			const batch = gameCompanies.slice(i, i + batchSize);
			
			const validGameCompanyDtos: Array<GameCompanyCreateDto> = [];

			for (const gameCompany of batch) {
				const gameChecksum = this.extractChecksum(gameCompany.game);
				const companyChecksum = this.extractChecksum(gameCompany.company);
				
				if (!gameChecksum || !companyChecksum) {
					continue;
				}

				const game = await this.gameReadService.findById(gameChecksum);
				if (!game) {
					this.logger.warn(`${this.prefix} GameCompany ${gameCompany.checksum}: game ${gameChecksum} not found in database, skipping`);
					continue;
				}

				const company = await this.companyReadService.findById(companyChecksum);
				if (!company) {
					this.logger.warn(`${this.prefix} GameCompany ${gameCompany.checksum}: company ${companyChecksum} not found in database, skipping`);
					continue;
				}

				validGameCompanyDtos.push(new GameCompanyCreateDto({
					checksum: gameCompany.checksum || '',
					gameId: gameChecksum,
					companyId: companyChecksum,
					developer: gameCompany.developer || false,
					publisher: gameCompany.publisher || false,
					supporting: gameCompany.supporting || false,
				}));
			}

			if (validGameCompanyDtos.length === 0) {
				continue;
			}

			try {
				await this.gameCompanyWriteService.createMany(validGameCompanyDtos);
			} catch (error: unknown) {
				const prismaError = error as { code?: string; meta?: { target?: string[] }; message?: string };
				this.logger.error(`${this.prefix} Failed to create game companies batch`, {
					batchStart: i + 1,
					batchEnd: i + batch.length,
					errorCode: prismaError.code,
					errorMessage: prismaError.message,
					error: error,
				});
				throw error;
			}

			processedCount += validGameCompanyDtos.length;
		}

		this.logger.log(`${this.prefix} ✅ Seeded ${processedCount} game companies`);
	}

	async getData(): Promise<IgdbInvolvedCompany[]> {
        let hasMore = true;
        let offset = 0;
        const allData: IgdbInvolvedCompany[] = [];

        while(hasMore) {
            try {
                const {
                    data
                } = await igdb(this.clientId, this.accessToken)
                    .fields('checksum,game.checksum,company.checksum,developer,publisher,supporting')
                    .limit(this.LIMIT)
                    .offset(offset)
                    .request('involved_companies');

                const typedData = data as IgdbInvolvedCompany[];

                if (typedData.length === 0) {
                    hasMore = false;
                    break;
                }

                allData.push(...typedData);

                if (typedData.length < this.LIMIT) {
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

                this.logger.error(`${this.prefix} Error fetching game companies from IGDB`, {
                    offset,
                    message: err.message || String(error),
                    error: error,
                });
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        return allData;
    }

	private extractChecksum(value: number | string | { checksum: string } | null | undefined): string | null {
		if (!value) {
			return null;
		}
		if (typeof value === 'object' && value !== null && 'checksum' in value) {
			return value.checksum;
		}
		return null;
	}
}

