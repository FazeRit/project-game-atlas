import { GameCompany } from '@prisma/client';
import { IGameCompanyReadRepository } from '../abstracts/igame-company-read.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GameCompanyReadRepository implements IGameCompanyReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<GameCompany | null> {
		return this.prisma.gameCompany.findUnique({
			where: {
				checksum
			}
		});
	}
}

