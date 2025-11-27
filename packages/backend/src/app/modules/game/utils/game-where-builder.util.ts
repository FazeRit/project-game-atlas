import { GameFiltersDto } from '../dto/request/game/game-filters.dto';
import { Prisma } from '@prisma/client';

export class GameWhereBuilder {
	static build(
		filters?: GameFiltersDto,
		search?: Record<string, unknown>
	): Prisma.GameWhereInput {
		const where: Prisma.GameWhereInput = {};

		GameWhereBuilder.applyGenresFilter(where, filters);
		GameWhereBuilder.applyKeywordsFilter(where, filters);
		GameWhereBuilder.applySearchFilter(where, search);

		return where;
	}

	private static applyGenresFilter(
		where: Prisma.GameWhereInput,
		filters?: GameFiltersDto
	): void {
		if (filters?.genres && filters.genres.length > 0) {
			const normalizedGenres = filters.genres.map(g => g.toLowerCase());

			where.gameGenres = {
				some: {
					genre: {
						OR: [
							{
								slug: {
									in: normalizedGenres
								}
							},
							{
								name: {
									in: filters.genres
								}
							}
						]
					}
				}
			};
		}
	}

	private static applyKeywordsFilter(
		where: Prisma.GameWhereInput,
		filters?: GameFiltersDto
	): void {
		if (filters?.keywords && filters.keywords.length > 0) {
			where.gameKeywords = {
				some: {
					keyword: {
						OR: [
							{
								slug: {
									in: filters.keywords
								}
							},
							{
								name: {
									in: filters.keywords
								}
							}
						]
					}
				}
			};
		}
	}

	private static applySearchFilter(
		where: Prisma.GameWhereInput,
		search?: Record<string, unknown>
	): void {
		if (search && Object.keys(search).length > 0) {
			if (where.AND) {
				const existingAnd = Array.isArray(where.AND) ? where.AND : [where.AND];
				where.AND = [
					...existingAnd,
					search
				];
			} else {
				where.AND = [search];
			}
		}
	}
}
