import { GameGenreCreateDto } from '../../../game/dto';
import { IGameGenreWriteRepository } from '../../../game/repositories/genres/game-genres/abstracts/igame-genre-write.repository';
import { IGenreReadRepository } from '../../../game/repositories/genres/genres/abstracts/igenre-read.repository';
import { Injectable, Logger } from '@nestjs/common';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class GameGenresSeeder {
	private readonly logger = new Logger(GameGenresSeeder.name);
	private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    constructor(
		private readonly gameGenreWriteRepository: IGameGenreWriteRepository,
		private readonly genreReadRepository: IGenreReadRepository
	) {}

	async seed(gameId: string, genreIds: string | Array<string>) {
		if (!genreIds) {
			return;
		}

		const idsArray = Array.isArray(genreIds) ? genreIds : [genreIds];

		if (idsArray.length === 0) {
			return;
		}

		const existingGenreIds: string[] = [];
		const missingGenreIds: string[] = [];

		for (const genreId of idsArray) {
			const genre = await this.genreReadRepository.findById(genreId);
			if (genre) {
				existingGenreIds.push(genreId);
			} else {
				missingGenreIds.push(genreId);
			}
		}

		if (missingGenreIds.length > 0) {
			this.logger.warn(`${this.prefix} GameId: ${gameId}, missing genre checksums in database: ${missingGenreIds.join(', ')}`);
		}

		if (existingGenreIds.length === 0) {
			this.logger.warn(`${this.prefix} GameId: ${gameId}, no valid genres found, skipping`);
			return;
		}

		try {
			if (existingGenreIds.length === 1) {
				const gameGenreDto = new GameGenreCreateDto({
					gameId,
					genreId: existingGenreIds[0],
				});
				await this.gameGenreWriteRepository.create(gameGenreDto);
			} else {
				const gameGenreDtos: Array<GameGenreCreateDto> = existingGenreIds.map(genreId => {
					return new GameGenreCreateDto({
						gameId,
						genreId,
					});
				});
				await this.gameGenreWriteRepository.createMany(gameGenreDtos);
			}
		} catch (error: unknown) {
			const genreIdsStr = existingGenreIds.length === 1 ? existingGenreIds[0] : existingGenreIds.join(', ');
			this.logger.error(`${this.prefix} gameId: ${gameId}, genreIds: ${genreIdsStr}`);
		}
	}
}