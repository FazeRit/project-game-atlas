import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { IGameKeywordReadRepository } from '../abstracts/igame-keyword-read.repository';

@Injectable()
export class GameKeywordReadRepository implements IGameKeywordReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string) {
		return this.prisma.gameKeyword.findUnique({
			where: {
				checksum
			}
		})
	}
}

