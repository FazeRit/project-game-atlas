import { BadRequestException, Injectable } from '@nestjs/common';
import { GameKeyword } from '@prisma/client';
import { GameKeywordCreateDto, GameKeywordUpdateDto } from '../../../../dto';
import { GameKeywordsReadService } from '../game-keywords-read-service/game-keywords-read.service';
import { IGameKeywordWriteRepository } from '../../../../repositories/keywords/game-keywords/abstracts/igame-keyword-write.repository';

@Injectable()
export class GameKeywordsWriteService {
	constructor(
		private readonly gameKeywordsReadService: GameKeywordsReadService,
		private readonly gameKeywordWriteRepository: IGameKeywordWriteRepository,
	) {}

	async create(data: GameKeywordCreateDto): Promise<GameKeyword> {
		const gameKeyword = await this.gameKeywordWriteRepository.create(data);

		if (!gameKeyword) {
			throw new BadRequestException('Failed to create game keyword');
		}

		return gameKeyword;
	}

	async update(checksum: string, data: GameKeywordUpdateDto): Promise<GameKeyword> {
		const existingGameKeyword = await this.gameKeywordsReadService.findById(checksum);

		if (!existingGameKeyword) {
			throw new BadRequestException('Game keyword not found');
		}

		const updatedGameKeyword = await this.gameKeywordWriteRepository.update(checksum, data);

		if (!updatedGameKeyword) {
			throw new BadRequestException('Failed to update game keyword');
		}

		return updatedGameKeyword;
	}

	async delete(checksum: string): Promise<void> {
		const existingGameKeyword = await this.gameKeywordsReadService.findById(checksum);

		if (!existingGameKeyword) {
			throw new BadRequestException('Game keyword not found');
		}

		await this.gameKeywordWriteRepository.delete(checksum);
	}

	async createMany(data: Array<GameKeywordCreateDto>): Promise<void> {
		await this.gameKeywordWriteRepository.createMany(data);
	}
}

