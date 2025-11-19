import { GameGenre } from '@prisma/client';
import { IGameGenreReadRepository } from '../abstracts/igame-genre-read.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GameGenreReadRepository implements IGameGenreReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<GameGenre | null> {
		return this.prisma.gameGenre.findUnique({
			where: {
				checksum
			}
		});
	}
}

