import { GameCompany } from '@prisma/client';
import { IGameCompanyReadRepository } from '../../../../repositories/companies/game-company/abstracts/igame-company-read.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameCompanyReadService {
	constructor(
		private readonly gameCompanyReadRepository: IGameCompanyReadRepository,
	) {}

	async findById(checksum: string): Promise<GameCompany | null> {
		return this.gameCompanyReadRepository.findById(checksum);
	}
}

