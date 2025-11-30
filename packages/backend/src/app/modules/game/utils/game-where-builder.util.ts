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

			where.AND = normalizedGenres.map(genre => ({
				gameGenres: {
					some: {
						genre: {
							slug: genre,
						},
					},
				},
			}));
		}
	}

	private static applyKeywordsFilter(
		where: Prisma.GameWhereInput,
		filters?: GameFiltersDto
	): void {
		if (filters?.keywords && filters.keywords.length > 0) {
			const normalizedKeywords = filters.keywords.map(k => k.toLowerCase());

			const keywordConditions = normalizedKeywords.map(keyword => ({
				gameKeywords: {
					some: {
						keyword: {
							slug: keyword,
						},
					},
				},
			}));

			if (where.AND && Array.isArray(where.AND)) {
				where.AND.push(...keywordConditions);
			} else {
				where.AND = keywordConditions;
			}
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
