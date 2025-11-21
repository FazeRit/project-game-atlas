import { GameFiltersDto } from '../../../dto/request/game/game-filters.dto';
import { GameWhereBuilder } from '../../../utils/game-where-builder.util';
import { GameWithDetails } from '../../../types/game/game-with-details.type';
import { IGameReadRepository } from '../abstracts/igame-read.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class GameReadRepository implements IGameReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<GameWithDetails | null> {
		return this.prisma.game.findUnique({
			where: {
				checksum
			},
			include: {
				cover: true,
				screenshots: true,
				gameGenres: {
					include: {
						genre: true
					}
				},
				gameKeywords: {
					include: {
						keyword: true
					}
				},
				gameCompanies: {
					include: {
						company: true
					}
				},
				gamePlatforms: {
					include: {
						platform: true
					}
				},
			},
		});
	}

	async findAll(page: number, limit: number, filters?: GameFiltersDto, search?: Record<string, unknown>): Promise<Array<GameWithDetails>> {
		const where = GameWhereBuilder.build(filters, search);

		const skip = (page - 1) * limit;

		return this.prisma.game.findMany({
			where,
			include: {
				cover: true,
				screenshots: true,
				gameGenres: {
					include: {
						genre: true
					}
				},
				gameKeywords: {
					include: {
						keyword: true
					}
				},
				gameCompanies: {
					include: {
						company: true
					}
				},
				gamePlatforms: {
					include: {
						platform: true
					}
				},
			},
			skip,
			take: limit,
		});
	}

	async count(filters?: GameFiltersDto, search?: Record<string, unknown>): Promise<number> {
		const where = GameWhereBuilder.build(filters, search);
		return this.prisma.game.count({ where });
	}
}