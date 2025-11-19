import { GameKeyword } from '@prisma/client';
import { GameKeywordCreateDto, GameKeywordUpdateDto } from '../../../../dto';
import { IGameKeywordWriteRepository } from '../abstracts/igame-keyword-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GameKeywordWriteRepository implements IGameKeywordWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: GameKeywordCreateDto): Promise<GameKeyword | null> {
		return this.prisma.gameKeyword.create({
			data
		});
	}

	async createMany(data: Array<GameKeywordCreateDto>): Promise<void> {
		await this.prisma.gameKeyword.createMany({
			data,
			skipDuplicates: true
		});
	}

	async update(checksum: string, data: GameKeywordUpdateDto): Promise<GameKeyword | null> {
		return this.prisma.gameKeyword.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.gameKeyword.delete({
			where: {
				checksum
			}
		});
	}
}

