import { Injectable } from '@nestjs/common';
import { IPersonalLibraryGameWriteRepository } from '../abstracts/ipersonal-library-game-write.repository';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PersonalLibraryGameWriteRepository implements IPersonalLibraryGameWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: PersonalLibraryGameCreateDto): Promise<PersonalLibraryGame | null> {
		return this.prisma.personalLibraryGame.create({
			data
		});
	}

	async update(checksum: string, data: PersonalLibraryGameUpdateDto): Promise<PersonalLibraryGame | null> {
		return this.prisma.personalLibraryGame.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.personalLibraryGame.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<PersonalLibraryGameCreateDto>): Promise<void> {
		await this.prisma.personalLibraryGame.createMany({
			data,
			skipDuplicates: true
		});
	}
}

