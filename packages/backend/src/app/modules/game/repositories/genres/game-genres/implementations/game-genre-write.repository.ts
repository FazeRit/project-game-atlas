import { GameGenre } from '@prisma/client';
import { GameGenreCreateDto } from '../../../../dto/request/game-genre/game-genre-create.dto';
import { GameGenreUpdateDto } from '../../../../dto/request/game-genre/game-genre-update.dto';
import { IGameGenreWriteRepository } from '../abstracts/igame-genre-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GameGenreWriteRepository implements IGameGenreWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: GameGenreCreateDto): Promise<GameGenre | null> {
		return this.prisma.gameGenre.create({
			data
		});
	}

	async createMany(data: Array<GameGenreCreateDto>): Promise<void> {
		await this.prisma.gameGenre.createMany({
			data,
			skipDuplicates: true
		});
	}

	async update(checksum: string, data: GameGenreUpdateDto): Promise<GameGenre | null> {
		return this.prisma.gameGenre.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.gameGenre.delete({
			where: {
				checksum
			}
		});
	}
}

