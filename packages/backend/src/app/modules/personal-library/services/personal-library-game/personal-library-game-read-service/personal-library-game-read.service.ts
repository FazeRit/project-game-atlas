import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository';
import { IPersonalLibraryReadRepository } from '../../../repositories/personal-library/abstracts/ipersonal-library-read.repository';
import { PersonalLibraryGame } from '@prisma/client';

@Injectable()
export class PersonalLibraryGameReadService {
	constructor(
		private readonly personalLibraryGameReadRepository: IPersonalLibraryGameReadRepository,
		private readonly personalLibraryReadRepository: IPersonalLibraryReadRepository,
	) {}

	async findById(checksum: string): Promise<PersonalLibraryGame | null> {
		return this.personalLibraryGameReadRepository.findById(checksum);
	}

	async findByPersonalLibraryId(personalLibraryId: string): Promise<PersonalLibraryGame[]> {
		return this.personalLibraryGameReadRepository.findByPersonalLibraryId(personalLibraryId);
	}

	async findByUserId(userId: string): Promise<PersonalLibraryGame[]> {
		const personalLibrary = await this.personalLibraryReadRepository.findByUserId(userId);

		if (!personalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		return this.personalLibraryGameReadRepository.findByPersonalLibraryId(personalLibrary.checksum);
	}
}

