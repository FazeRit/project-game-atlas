import { Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository';
import { PersonalLibraryGame } from '@prisma/client';

@Injectable()
export class PersonalLibraryGameReadService {
	constructor(
		private readonly personalLibraryGameReadRepository: IPersonalLibraryGameReadRepository,
	) {}

	async findById(checksum: string): Promise<PersonalLibraryGame | null> {
		return this.personalLibraryGameReadRepository.findById(checksum);
	}
}

