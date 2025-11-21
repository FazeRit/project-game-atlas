import { BadRequestException, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import { GameCreateDto } from '../../../dto/request/game/game-create.dto';
import { GameReadService } from '../game-read-service/game-read.service';
import { GameUpdateDto } from '../../../dto/request/game/game-update.dto';
import { IGameWriteRepository } from '../../../repositories/games/abstracts/igame-write.repository';

@Injectable()
export class GameWriteService {
	constructor(
		private readonly gameReadService: GameReadService,
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
		const exists = await this.gameReadService.exists(checksum);

		if (!exists) {
			throw new BadRequestException('Game not found');
		}

		const updatedGame = await this.gameWriteRepository.update(checksum, data);

		if (!updatedGame) {
			throw new BadRequestException('Failed to update game');
		}

		return updatedGame;
	}

	async delete(checksum: string): Promise<void> {
		const exists = await this.gameReadService.exists(checksum);

		if (!exists) {
			throw new BadRequestException('Game not found');
		}

		await this.gameWriteRepository.delete(checksum);
	}

	async createMany(data: Array<GameCreateDto>): Promise<void> {
		await this.gameWriteRepository.createMany(data);
	}
}

