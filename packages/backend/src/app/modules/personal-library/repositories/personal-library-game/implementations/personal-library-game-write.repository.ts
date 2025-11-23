import { BadRequestException, Injectable } from '@nestjs/common';
import { IPersonalLibraryGameWriteRepository } from '../abstracts/ipersonal-library-game-write.repository';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PersonalLibraryGameWriteRepository implements IPersonalLibraryGameWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: PersonalLibraryGameCreateDto): Promise<PersonalLibraryGame | null> {
		if (!data.gameId) {
			throw new BadRequestException('gameId is required');
		}

		if (!data.personalLibraryId) {
			throw new BadRequestException('personalLibraryId is required');
		}

		const {
			gameId,
			personalLibraryId,
			status,
			rank,
			note,
		} = data;

		return this.prisma.personalLibraryGame.create({
			data: {
				status,
				rank,
				note,
				game: {
					connect: {
						checksum: gameId
					}
				},
				personalLibrary: {
					connect: {
						checksum: personalLibraryId
					}
				}
			}
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

