import { Game } from '@prisma/client';
import { IGameReadRepository } from '../../../repositories/game/abstracts/igame-read.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameReadService {
	constructor(
		private readonly gameReadRepository: IGameReadRepository,
	) {}

	async findById(checksum: string): Promise<Game | null> {
		return this.gameReadRepository.findById(checksum);
	}
}

