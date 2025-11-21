import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository';
import { IPersonalLibraryGameWriteRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-write.repository';
import { IPersonalLibraryReadRepository } from '../../../repositories/personal-library/abstracts/ipersonal-library-read.repository';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';

@Injectable()
export class PersonalLibraryGameWriteService {
	constructor(
		private readonly personalLibraryGameReadRepository: IPersonalLibraryGameReadRepository,
		private readonly personalLibraryGameWriteRepository: IPersonalLibraryGameWriteRepository,
		private readonly personalLibraryReadRepository: IPersonalLibraryReadRepository,
	) {}

	async create(userId: string, data: PersonalLibraryGameCreateDto): Promise<PersonalLibraryGame> {
		const personalLibrary = await this.personalLibraryReadRepository.findByUserId(userId);

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
		const personalLibrary = await this.personalLibraryReadRepository.findByUserId(userId);

		if (!personalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		if (!data.gameId) {
			throw new BadRequestException('gameId is required');
		}

		const existingPersonalLibraryGame = await this.personalLibraryGameReadRepository.findByUserIdAndGameId(userId, data.gameId);

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
		const personalLibrary = await this.personalLibraryReadRepository.findByUserId(userId);

		if (!personalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		const existingPersonalLibraryGame = await this.personalLibraryGameReadRepository.findById(checksum);

		if (!existingPersonalLibraryGame) {
			throw new BadRequestException('Personal library game not found');
		}

		if (existingPersonalLibraryGame.personalLibraryId !== personalLibrary.checksum) {
			throw new BadRequestException('Personal library game does not belong to user');
		}

		await this.personalLibraryGameWriteRepository.delete(checksum);
	}
}

