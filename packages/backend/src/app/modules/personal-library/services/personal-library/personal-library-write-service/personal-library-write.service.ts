import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryWriteRepository } from '../../../repositories/personal-library/abstracts/ipersonal-library-write.repository';
import { PersonalLibrary } from '@prisma/client';
import { PersonalLibraryReadService } from '../personal-library-read-service/personal-library-read.service';
import { PersonalLibraryCreateDto } from '../../../dto/request/personal-library';

@Injectable()
export class PersonalLibraryWriteService {
	constructor(
		private readonly personalLibraryReadService: PersonalLibraryReadService,
		private readonly personalLibraryWriteRepository: IPersonalLibraryWriteRepository,
	) {}

	async create(data: PersonalLibraryCreateDto): Promise<PersonalLibrary> {
		const existingPersonalLibrary = await this.personalLibraryReadService.findByUserId(data.userId);

		if (existingPersonalLibrary) {
			throw new BadRequestException('Personal library already exists for this user');
		}

		const personalLibrary = await this.personalLibraryWriteRepository.create(data);

		if (!personalLibrary) {
			throw new BadRequestException('Failed to create personal library');
		}

		return personalLibrary;
	}
}

