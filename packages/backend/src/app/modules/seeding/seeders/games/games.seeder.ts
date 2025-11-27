import igdb from 'igdb-api-node';
import { EnvEnum } from '../../../../config/env/enums/env.enum';
import { EnvService } from '../../../../config/env/services/env.service';
import { GameCreateDto } from '../../../game/dto/request/game/game-create.dto';
import { GameGenresSeeder } from '../genres/game-genres.seeder';
import { GameKeywordsSeeder } from '../keywords/game-keywords.seeder';
import { GameWriteService } from '../../../game/services/games/game-write-service/game-write.service';
import { IgdbGame } from './types/igdb-game.interface';
import { Injectable, Logger } from '@nestjs/common';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class GamesSeeder {
    private readonly clientId: string;
    private readonly accessToken: string;

    private readonly logger = new Logger(GamesSeeder.name);

    private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    private readonly LIMIT: number = 500;

    constructor(
		private readonly gameWriteService: GameWriteService,
		private readonly gameGenresSeeder: GameGenresSeeder,
		private readonly gameKeywordsSeeder: GameKeywordsSeeder,
		private readonly envService: EnvService
	) {
		this.clientId = this.envService.get(EnvEnum.IGDB_CLIENT_ID);
		this.accessToken = this.envService.get(EnvEnum.IGDB_ACCESS_TOKEN);
	}

	async seed() {
		this.logger.log(`${this.prefix} Starting games seeding...`);
		const games = await this.getData();

		const batchSize = 500;
		let processedCount = 0;
		let totalGenresCreated = 0;
		let totalPlatfrosmCreated = 0;
		let totalKeywordsCreated = 0;

		for (let i = 0; i < games.length; i += batchSize) {
			const batch = games.slice(i, i + batchSize);

			const gameDtos: Array<GameCreateDto> = batch.map(game => new GameCreateDto({
				checksum: game.checksum,
				name: game.name,
				summary: game.summary || undefined,
				storyline: game.storyline || undefined,
				totalRating: game.total_rating || undefined,
				totalRatingCount: game.total_rating_count || undefined,
				url: game.url || undefined,
				firstReleaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : undefined,
			}));

			try {
				await this.gameWriteService.createMany(gameDtos);
			} catch (error: unknown) {
				const prismaError = error as { code?: string; meta?: { target?: string[] }; message?: string };
				this.logger.error(`${this.prefix} Failed to create games batch`, {
					batchStart: i + 1,
					batchEnd: i + batch.length,
					errorCode: prismaError.code,
					errorMessage: prismaError.message,
					error: error,
				});
				throw error;
			}

			for (const game of batch) {
				totalGenresCreated += await this.seedGameGenres(game);
				totalPlatfrosmCreated += await this.seedGamePlatforms(game);
				totalKeywordsCreated += await this.seedGameKeywords(game);
			}

			processedCount += batch.length;
		}

		this.logger.log(`${this.prefix} ✅ Seeded ${processedCount} games, ${totalGenresCreated} genres, ${totalPlatfrosmCreated} platforms, ${totalKeywordsCreated} keywords`);
	}

	private async seedGameGenres(game: IgdbGame): Promise<number> {
		if (game.genres && Array.isArray(game.genres) && game.genres.length > 0) {
			const genreIds = game.genres.map((genre: number | string | { checksum: string }) => {
				if (typeof genre === 'object' && genre !== null && 'checksum' in genre) {
					return genre.checksum;
				}
				return genre.toString();
			});

			await this.gameGenresSeeder.seed(game.checksum, genreIds);

			return genreIds.length;
		}
		return 0;
	}

		private async seedGamePlatforms(game: IgdbGame): Promise<number> {
		if (game.platforms && Array.isArray(game.genres) && game.platforms.length > 0) {
			const platformIds = game.platforms.map((platform: number | string | { checksum: string }) => {
				if (typeof platform === 'object' && platform !== null && 'checksum' in platform) {
					return platform.checksum;
				}
				return platform.toString();
			});

			await this.gameGenresSeeder.seed(game.checksum, platformIds);

			return platformIds.length;
		}
		return 0;
	}

	private async seedGameKeywords(game: IgdbGame): Promise<number> {
		if (game.keywords && Array.isArray(game.keywords) && game.keywords.length > 0) {
			const keywordIds = game.keywords.map((keyword: number | string | { checksum: string }) => {
				if (typeof keyword === 'object' && keyword !== null && 'checksum' in keyword) {
					return keyword.checksum;
				}
				return keyword.toString();
			});

			await this.gameKeywordsSeeder.seed(game.checksum, keywordIds);

			return keywordIds.length;
		}
		return 0;
	}

	async getData(): Promise<IgdbGame[]> {
        let hasMore = true;
        let offset = 0;
        const allData: IgdbGame[] = [];

        while(hasMore) {
            try {
                const {
                    data
                } = await igdb(this.clientId, this.accessToken)
                    .fields('checksum,name,summary,storyline,total_rating,total_rating_count,url,first_release_date,genres.checksum,keywords.checksum')
                    .limit(this.LIMIT)
                    .offset(offset)
                    .request('games');

                const typedData = data as IgdbGame[];

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

                this.logger.error(`${this.prefix} Error fetching games from IGDB`, {
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

