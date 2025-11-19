import { GameGenreCreateDto } from '../../../game/dto';
import { GameGenresWriteService } from '../../../game/services/genres/game-genres/game-genres-write-service/game-genres-write.service';
import { GenreReadService } from '../../../game/services/genres/genres/genres-read-service/genre-read.service';
import { Injectable, Logger } from '@nestjs/common';
import { SEEDING_LOGGER_PREFIXES } from '../../const/seeding-logger.const';

@Injectable()
export class GameGenresSeeder {
	private readonly logger = new Logger(GameGenresSeeder.name);
	private readonly prefix = SEEDING_LOGGER_PREFIXES.SEEDING;

    constructor(
		private readonly gameGenresWriteService: GameGenresWriteService,
		private readonly genreReadService: GenreReadService
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
			const genre = await this.genreReadService.findById(genreId);
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
				await this.gameGenresWriteService.create(gameGenreDto);
			} else {
				const gameGenreDtos: Array<GameGenreCreateDto> = existingGenreIds.map(genreId => {
					return new GameGenreCreateDto({
						gameId,
						genreId,
					});
				});
				await this.gameGenresWriteService.createMany(gameGenreDtos);
			}
		} catch (error: unknown) {
			const genreIdsStr = existingGenreIds.length === 1 ? existingGenreIds[0] : existingGenreIds.join(', ');
			this.logger.error(`${this.prefix} gameId: ${gameId}, genreIds: ${genreIdsStr}`);
		}
	}
}