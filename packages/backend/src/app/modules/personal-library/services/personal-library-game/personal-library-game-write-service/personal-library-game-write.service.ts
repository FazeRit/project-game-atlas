import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryGameWriteRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-write.repository';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';
import { PersonalLibraryGameReadService } from '../personal-library-game-read-service/personal-library-game-read.service';
import { PersonalLibraryReadService } from '../../personal-library/personal-library-read-service/personal-library-read.service';

@Injectable()
export class PersonalLibraryGameWriteService {
	constructor(
		private readonly personalLibraryGameReadService: PersonalLibraryGameReadService,
		private readonly personalLibraryGameWriteRepository: IPersonalLibraryGameWriteRepository,
		private readonly personalLibraryReadService: PersonalLibraryReadService,
	) {}

	async create(userId: string, data: PersonalLibraryGameCreateDto): Promise<PersonalLibraryGame> {
		const personalLibrary = await this.personalLibraryReadService.findByUserId(userId);

		if (!personalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		const personalLibraryGame = await this.personalLibraryGameWriteRepository.create({
			...data,
			personalLibraryId: personalLibrary.checksum,
		});

		if (!personalLibraryGame) {
			throw new BadRequestException('Failed to create personal library game');
		}

		return personalLibraryGame;
	}

	async update(userId: string, data: PersonalLibraryGameUpdateDto): Promise<PersonalLibraryGame> {
		if (!data.gameId) {
			throw new BadRequestException('gameId is required');
		}

		const existingPersonalLibraryGame = await this.personalLibraryGameReadService.findByUserIdAndGameId(userId, data.gameId);

		if (!existingPersonalLibraryGame) {
			throw new BadRequestException('Personal library game not found');
		}

		const updatedPersonalLibraryGame = await this.personalLibraryGameWriteRepository.update(existingPersonalLibraryGame.checksum, data);

		if (!updatedPersonalLibraryGame) {
			throw new BadRequestException('Failed to update personal library game');
		}

		return updatedPersonalLibraryGame;
	}

	async delete(userId: string, checksum: string): Promise<void> {
		const existingPersonalLibraryGame = await this.personalLibraryGameReadService.findByUserIdAndChecksum(userId, checksum);

		if (!existingPersonalLibraryGame) {
			throw new BadRequestException('Personal library game not found');
		}

		await this.personalLibraryGameWriteRepository.delete(checksum);
	}
}

