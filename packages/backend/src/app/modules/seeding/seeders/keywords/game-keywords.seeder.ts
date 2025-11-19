import { GameKeywordCreateDto } from '../../../game/dto';
import { IGameKeywordWriteRepository } from '../../../game/repositories/keywords/game-keywords/abstracts/igame-keyword-write.repository';
import { IKeywordReadRepository } from '../../../game/repositories/keywords/keywords/abstracts/ikeyword-read.repository';
import { Injectable, Logger } from '@nestjs/common';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class GameKeywordsSeeder {
	private readonly logger = new Logger(GameKeywordsSeeder.name);
	private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    constructor(
		private readonly gameKeywordWriteRepository: IGameKeywordWriteRepository,
		private readonly keywordReadRepository: IKeywordReadRepository
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
			const keyword = await this.keywordReadRepository.findById(keywordId);
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
				await this.gameKeywordWriteRepository.create(gameKeywordDto);
			} else {
				const gameKeywordDtos: Array<GameKeywordCreateDto> = existingKeywordIds.map(keywordId => {
					return new GameKeywordCreateDto({
						gameId,
						keywordId,
					});
				});
				await this.gameKeywordWriteRepository.createMany(gameKeywordDtos);
			}
		} catch (error: unknown) {
			const keywordIdsStr = existingKeywordIds.length === 1 ? existingKeywordIds[0] : existingKeywordIds.join(', ');
			this.logger.error(`${this.prefix} gameId: ${gameId}, keywordIds: ${keywordIdsStr}`);
		}
	}
}

