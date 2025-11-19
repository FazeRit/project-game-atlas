import { GameKeyword } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GameKeywordsReadService {
	constructor(
		private readonly prisma: PrismaService,
	) {}

	async findById(checksum: string): Promise<GameKeyword | null> {
		return this.prisma.gameKeyword.findUnique({
			where: {
				checksum
			}
		});
	}
}

