import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository';
import { IPersonalLibraryGameWriteRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-write.repository';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';

@Injectable()
export class PersonalLibraryGameWriteService {
	constructor(
		private readonly personalLibraryGameReadRepository: IPersonalLibraryGameReadRepository,
		private readonly personalLibraryGameWriteRepository: IPersonalLibraryGameWriteRepository,
	) {}

	async create(data: PersonalLibraryGameCreateDto): Promise<PersonalLibraryGame> {
		const personalLibraryGame = await this.personalLibraryGameWriteRepository.create(data);

		if (!personalLibraryGame) {
			throw new BadRequestException('Failed to create personal library game');
		}

		return personalLibraryGame;
	}

	async update(checksum: string, data: PersonalLibraryGameUpdateDto): Promise<PersonalLibraryGame> {
		const existingPersonalLibraryGame = await this.personalLibraryGameReadRepository.findById(checksum);

		if (!existingPersonalLibraryGame) {
			throw new BadRequestException('Personal library game not found');
		}

		const updatedPersonalLibraryGame = await this.personalLibraryGameWriteRepository.update(checksum, data);

		if (!updatedPersonalLibraryGame) {
			throw new BadRequestException('Failed to update personal library game');
		}

		return updatedPersonalLibraryGame;
	}

	async delete(checksum: string): Promise<void> {
		const existingPersonalLibraryGame = await this.personalLibraryGameReadRepository.findById(checksum);

		if (!existingPersonalLibraryGame) {
			throw new BadRequestException('Personal library game not found');
		}

		await this.personalLibraryGameWriteRepository.delete(checksum);
	}
}

