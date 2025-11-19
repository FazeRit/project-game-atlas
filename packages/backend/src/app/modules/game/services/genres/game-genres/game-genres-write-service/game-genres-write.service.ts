import { BadRequestException, Injectable } from '@nestjs/common';
import { GameGenre } from '@prisma/client';
import { GameGenreCreateDto } from '../../../../dto/request/game-genre/game-genre-create.dto';
import { GameGenreUpdateDto } from '../../../../dto/request/game-genre/game-genre-update.dto';
import { IGameGenreReadRepository } from '../../../../repositories/genres/game-genres/abstracts/igame-genre-read.repository';
import { IGameGenreWriteRepository } from '../../../../repositories/genres/game-genres/abstracts/igame-genre-write.repository';

@Injectable()
export class GameGenresWriteService {
	constructor(
		private readonly gameGenreReadRepository: IGameGenreReadRepository,
		private readonly gameGenreWriteRepository: IGameGenreWriteRepository,
	) {}

	async create(data: GameGenreCreateDto): Promise<GameGenre> {
		const gameGenre = await this.gameGenreWriteRepository.create(data);

		if (!gameGenre) {
			throw new BadRequestException('Failed to create game genre');
		}

		return gameGenre;
	}

	async update(checksum: string, data: GameGenreUpdateDto): Promise<GameGenre> {
		const existingGameGenre = await this.gameGenreReadRepository.findById(checksum);

		if (!existingGameGenre) {
			throw new BadRequestException('Game genre not found');
		}

		const updatedGameGenre = await this.gameGenreWriteRepository.update(checksum, data);

		if (!updatedGameGenre) {
			throw new BadRequestException('Failed to update game genre');
		}

		return updatedGameGenre;
	}

	async delete(checksum: string): Promise<void> {
		const existingGameGenre = await this.gameGenreReadRepository.findById(checksum);

		if (!existingGameGenre) {
			throw new BadRequestException('Game genre not found');
		}

		await this.gameGenreWriteRepository.delete(checksum);
	}

	async createMany(data: Array<GameGenreCreateDto>): Promise<void> {
		await this.gameGenreWriteRepository.createMany(data);
	}
}

