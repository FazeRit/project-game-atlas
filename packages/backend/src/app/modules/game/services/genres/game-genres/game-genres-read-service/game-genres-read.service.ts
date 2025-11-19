import { GameGenre } from '@prisma/client';
import { IGameGenreReadRepository } from '../../../../repositories/genres/game-genres/abstracts/igame-genre-read.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameGenresReadService {
	constructor(
		private readonly gameGenreReadRepository: IGameGenreReadRepository,
	) {}

	async findById(checksum: string): Promise<GameGenre | null> {
		return this.gameGenreReadRepository.findById(checksum);
	}
}

