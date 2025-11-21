import { BadRequestException, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import { GameCreateDto } from '../../../dto/request/game/game-create.dto';
import { GameUpdateDto } from '../../../dto/request/game/game-update.dto';
import { IGameReadRepository } from '../../../repositories/games/abstracts/igame-read.repository';
import { IGameWriteRepository } from '../../../repositories/games/abstracts/igame-write.repository';

@Injectable()
export class GameWriteService {
	constructor(
		private readonly gameReadRepository: IGameReadRepository,
		private readonly gameWriteRepository: IGameWriteRepository,
	) {}

	async create(data: GameCreateDto): Promise<Game> {
		const game = await this.gameWriteRepository.create(data);

		if (!game) {
			throw new BadRequestException('Failed to create game');
		}

		return game;
	}

	async update(checksum: string, data: GameUpdateDto): Promise<Game> {
		const existingGame = await this.gameReadRepository.findById(checksum);

		if (!existingGame) {
			throw new BadRequestException('Game not found');
		}

		const updatedGame = await this.gameWriteRepository.update(checksum, data);

		if (!updatedGame) {
			throw new BadRequestException('Failed to update game');
		}

		return updatedGame;
	}

	async delete(checksum: string): Promise<void> {
		const existingGame = await this.gameReadRepository.findById(checksum);

		if (!existingGame) {
			throw new BadRequestException('Game not found');
		}

		await this.gameWriteRepository.delete(checksum);
	}

	async createMany(data: Array<GameCreateDto>): Promise<void> {
		await this.gameWriteRepository.createMany(data);
	}
}

