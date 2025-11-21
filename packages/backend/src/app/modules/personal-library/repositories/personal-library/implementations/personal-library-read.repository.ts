import { Injectable } from '@nestjs/common';
import { IPersonalLibraryReadRepository } from '../abstracts/ipersonal-library-read.repository';
import { PersonalLibrary } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PersonalLibraryReadRepository implements IPersonalLibraryReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<PersonalLibrary | null> {
		return this.prisma.personalLibrary.findUnique({
			where: {
				checksum
			}
		});
	}

	async findByUserId(userId: string): Promise<PersonalLibrary | null> {
		return this.prisma.personalLibrary.findUnique({
			where: {
				userId
			}
		});
	}
}

