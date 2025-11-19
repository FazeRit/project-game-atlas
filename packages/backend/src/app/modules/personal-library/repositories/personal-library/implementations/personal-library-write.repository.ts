import { Injectable } from '@nestjs/common';
import { IPersonalLibraryWriteRepository } from '../abstracts/ipersonal-library-write.repository';
import { PersonalLibrary } from '@prisma/client';
import { PersonalLibraryCreateDto, PersonalLibraryUpdateDto } from '../../../dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PersonalLibraryWriteRepository implements IPersonalLibraryWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: PersonalLibraryCreateDto): Promise<PersonalLibrary | null> {
		return this.prisma.personalLibrary.create({
			data
		});
	}

	async update(checksum: string, data: PersonalLibraryUpdateDto): Promise<PersonalLibrary | null> {
		return this.prisma.personalLibrary.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.personalLibrary.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<PersonalLibraryCreateDto>): Promise<void> {
		await this.prisma.personalLibrary.createMany({
			data,
			skipDuplicates: true
		});
	}
}

