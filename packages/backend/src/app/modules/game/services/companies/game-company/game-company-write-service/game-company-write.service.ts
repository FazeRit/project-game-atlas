import { BadRequestException, Injectable } from '@nestjs/common';
import { GameCompany } from '@prisma/client';
import { GameCompanyCreateDto } from '../../../../dto/request/game-company/game-company-create.dto';
import { GameCompanyReadService } from '../game-company-read-service/game-company-read.service';
import { GameCompanyUpdateDto } from '../../../../dto/request/game-company/game-company-update.dto';
import { IGameCompanyWriteRepository } from '../../../../repositories/companies/game-company/abstracts/igame-company-write.repository';

@Injectable()
export class GameCompanyWriteService {
	constructor(
		private readonly gameCompanyReadService: GameCompanyReadService,
		private readonly gameCompanyWriteRepository: IGameCompanyWriteRepository,
	) {}

	async create(data: GameCompanyCreateDto): Promise<GameCompany> {
		const gameCompany = await this.gameCompanyWriteRepository.create(data);

		if (!gameCompany) {
			throw new BadRequestException('Failed to create game company');
		}

		return gameCompany;
	}

	async update(checksum: string, data: GameCompanyUpdateDto): Promise<GameCompany> {
		const existingGameCompany = await this.gameCompanyReadService.findById(checksum);

		if (!existingGameCompany) {
			throw new BadRequestException('Game company not found');
		}

		const updatedGameCompany = await this.gameCompanyWriteRepository.update(checksum, data);

		if (!updatedGameCompany) {
			throw new BadRequestException('Failed to update game company');
		}

		return updatedGameCompany;
	}

	async delete(checksum: string): Promise<void> {
		const existingGameCompany = await this.gameCompanyReadService.findById(checksum);

		if (!existingGameCompany) {
			throw new BadRequestException('Game company not found');
		}

		await this.gameCompanyWriteRepository.delete(checksum);
	}

	async createMany(data: Array<GameCompanyCreateDto>): Promise<void> {
		await this.gameCompanyWriteRepository.createMany(data);
	}
}

