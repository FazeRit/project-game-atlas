import { Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../abstracts/ipersonal-library-game-read.repository';
import { PersonalLibraryGame } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PersonalLibraryGameReadRepository implements IPersonalLibraryGameReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<PersonalLibraryGame | null> {
		return this.prisma.personalLibraryGame.findUnique({
			where: {
				checksum
			}
		});
	}
}

