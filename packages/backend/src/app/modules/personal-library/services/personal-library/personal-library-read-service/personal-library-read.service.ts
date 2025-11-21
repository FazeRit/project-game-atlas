import { Injectable } from '@nestjs/common';
import { IPersonalLibraryReadRepository } from '../../../repositories/personal-library/abstracts/ipersonal-library-read.repository';
import { PersonalLibrary } from '@prisma/client';

@Injectable()
export class PersonalLibraryReadService {
	constructor(
		private readonly personalLibraryReadRepository: IPersonalLibraryReadRepository,
	) {}

	async findById(checksum: string): Promise<PersonalLibrary | null> {
		return this.personalLibraryReadRepository.findById(checksum);
	}

	async findByUserId(userId: string): Promise<PersonalLibrary | null> {
		return this.personalLibraryReadRepository.findByUserId(userId);
	}
}

