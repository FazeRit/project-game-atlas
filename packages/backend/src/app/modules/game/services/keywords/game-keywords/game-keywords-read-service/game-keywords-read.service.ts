import { GameKeyword } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IGameKeywordReadRepository } from '../../../../repositories/keywords/game-keywords/abstracts/igame-keyword-read.repository';

@Injectable()
export class GameKeywordsReadService {
	constructor(
		private readonly gameKeywordsReadRepository: IGameKeywordReadRepository,
	) {}

	async findById(checksum: string): Promise<GameKeyword | null> {
		return this.gameKeywordsReadRepository.findById(checksum);
	}
}