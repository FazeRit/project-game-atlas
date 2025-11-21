import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryWriteRepository } from '../../../repositories/personal-library/abstracts/ipersonal-library-write.repository';
import { PersonalLibrary } from '@prisma/client';
import { PersonalLibraryCreateDto, PersonalLibraryUpdateDto } from '../../../dto';
import { PersonalLibraryReadService } from '../personal-library-read-service/personal-library-read.service';

@Injectable()
export class PersonalLibraryWriteService {
	constructor(
		private readonly personalLibraryReadService: PersonalLibraryReadService,
		private readonly personalLibraryWriteRepository: IPersonalLibraryWriteRepository,
	) {}

	async create(data: PersonalLibraryCreateDto): Promise<PersonalLibrary> {
		const personalLibrary = await this.personalLibraryWriteRepository.create(data);

		if (!personalLibrary) {
			throw new BadRequestException('Failed to create personal library');
		}

		return personalLibrary;
	}

	async update(userId: string, data: PersonalLibraryUpdateDto): Promise<PersonalLibrary> {
		const existingPersonalLibrary = await this.personalLibraryReadService.findByUserId(userId);

		if (!existingPersonalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		const updatedPersonalLibrary = await this.personalLibraryWriteRepository.update(existingPersonalLibrary.checksum, data);

		if (!updatedPersonalLibrary) {
			throw new BadRequestException('Failed to update personal library');
		}

		return updatedPersonalLibrary;
	}

	async delete(userId: string): Promise<void> {
		const existingPersonalLibrary = await this.personalLibraryReadService.findByUserId(userId);

		if (!existingPersonalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		await this.personalLibraryWriteRepository.delete(existingPersonalLibrary.checksum);
	}
}

