import { GameKeywordCreateDto } from '../../../game/dto';
import { GameKeywordsWriteService } from '../../../game/services/keywords/game-keywords/game-keywords-write-service/game-keywords-write.service';
import { Injectable, Logger } from '@nestjs/common';
import { KeywordReadService } from '../../../game/services/keywords/keywords/keywords-read-service/keyword-read.service';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class GameKeywordsSeeder {
	private readonly logger = new Logger(GameKeywordsSeeder.name);
	private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    constructor(
		private readonly gameKeywordsWriteService: GameKeywordsWriteService,
		private readonly keywordReadService: KeywordReadService
	) {}

	async seed(gameId: string, keywordIds: string | Array<string>) {
		if (!keywordIds) {
			return;
		}

		const idsArray = Array.isArray(keywordIds) ? keywordIds : [keywordIds];

		if (idsArray.length === 0) {
			return;
		}

		const existingKeywordIds: string[] = [];
		const missingKeywordIds: string[] = [];

		for (const keywordId of idsArray) {
			const keyword = await this.keywordReadService.findById(keywordId);
			if (keyword) {
				existingKeywordIds.push(keywordId);
			} else {
				missingKeywordIds.push(keywordId);
			}
		}

		if (missingKeywordIds.length > 0) {
			this.logger.warn(`${this.prefix} GameId: ${gameId}, missing keyword checksums in database: ${missingKeywordIds.join(', ')}`);
		}

		if (existingKeywordIds.length === 0) {
			this.logger.warn(`${this.prefix} GameId: ${gameId}, no valid keywords found, skipping`);
			return;
		}

		try {
			if (existingKeywordIds.length === 1) {
				const gameKeywordDto = new GameKeywordCreateDto({
					gameId,
					keywordId: existingKeywordIds[0],
				});
				await this.gameKeywordsWriteService.create(gameKeywordDto);
			} else {
				const gameKeywordDtos: Array<GameKeywordCreateDto> = existingKeywordIds.map(keywordId => {
					return new GameKeywordCreateDto({
						gameId,
						keywordId,
					});
				});
				await this.gameKeywordsWriteService.createMany(gameKeywordDtos);
			}
		} catch (error: unknown) {
			const keywordIdsStr = existingKeywordIds.length === 1 ? existingKeywordIds[0] : existingKeywordIds.join(', ');
			this.logger.error(`${this.prefix} gameId: ${gameId}, keywordIds: ${keywordIdsStr}`);
		}
	}
}

