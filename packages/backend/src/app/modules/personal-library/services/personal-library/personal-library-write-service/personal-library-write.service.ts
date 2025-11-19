import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryReadRepository } from '../../../repositories/personal-library/abstracts/ipersonal-library-read.repository';
import { IPersonalLibraryWriteRepository } from '../../../repositories/personal-library/abstracts/ipersonal-library-write.repository';
import { PersonalLibrary } from '@prisma/client';
import { PersonalLibraryCreateDto, PersonalLibraryUpdateDto } from '../../../dto';

@Injectable()
export class PersonalLibraryWriteService {
	constructor(
		private readonly personalLibraryReadRepository: IPersonalLibraryReadRepository,
		private readonly personalLibraryWriteRepository: IPersonalLibraryWriteRepository,
	) {}

	async create(data: PersonalLibraryCreateDto): Promise<PersonalLibrary> {
		const personalLibrary = await this.personalLibraryWriteRepository.create(data);

		if (!personalLibrary) {
			throw new BadRequestException('Failed to create personal library');
		}

		return personalLibrary;
	}

	async update(checksum: string, data: PersonalLibraryUpdateDto): Promise<PersonalLibrary> {
		const existingPersonalLibrary = await this.personalLibraryReadRepository.findById(checksum);

		if (!existingPersonalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		const updatedPersonalLibrary = await this.personalLibraryWriteRepository.update(checksum, data);

		if (!updatedPersonalLibrary) {
			throw new BadRequestException('Failed to update personal library');
		}

		return updatedPersonalLibrary;
	}

	async delete(checksum: string): Promise<void> {
		const existingPersonalLibrary = await this.personalLibraryReadRepository.findById(checksum);

		if (!existingPersonalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		await this.personalLibraryWriteRepository.delete(checksum);
	}
}

