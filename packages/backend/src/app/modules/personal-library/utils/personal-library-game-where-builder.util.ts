import { PersonalLibraryGameFiltersDto } from '../dto/request/personal-library-game/personal-library-game-filters.dto';
import { Prisma } from '@prisma/client';

export class PersonalLibraryGameWhereBuilder {
	static build(
		userId: string,
		filters?: PersonalLibraryGameFiltersDto,
		search?: Record<string, unknown>
	): Prisma.PersonalLibraryGameWhereInput {
		const where: Prisma.PersonalLibraryGameWhereInput = {
			personalLibrary: {
				userId
			}
		};

		PersonalLibraryGameWhereBuilder.applyStatusFilter(where, filters);
		PersonalLibraryGameWhereBuilder.applyRankFilter(where, filters);
		PersonalLibraryGameWhereBuilder.applyGenresFilter(where, filters);
		PersonalLibraryGameWhereBuilder.applyKeywordsFilter(where, filters);
		PersonalLibraryGameWhereBuilder.applySearchFilter(where, search);

		return where;
	}

	private static applyStatusFilter(
		where: Prisma.PersonalLibraryGameWhereInput,
		filters?: PersonalLibraryGameFiltersDto
	): void {
		if (filters?.status && filters.status.length > 0) {
			where.status = {
				in: filters.status
			};
		}
	}

	private static applyRankFilter(
		where: Prisma.PersonalLibraryGameWhereInput,
		filters?: PersonalLibraryGameFiltersDto
	): void {
		if (filters?.rank && filters.rank.length > 0) {
			where.rank = {
				in: filters.rank
			};
		}
	}

	private static applyGenresFilter(
		where: Prisma.PersonalLibraryGameWhereInput,
		filters?: PersonalLibraryGameFiltersDto
	): void {
		if (filters?.genres && filters.genres.length > 0) {
			const normalizedGenres = filters.genres.map(g => g.toLowerCase());

			where.game = where.game ?? {}

			where.game.gameGenres = {
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
		where: Prisma.PersonalLibraryGameWhereInput,
		filters?: PersonalLibraryGameFiltersDto
	): void {
		if (filters?.keywords && filters.keywords.length > 0) {
			where.game = where.game ?? {}

			where.game.gameKeywords = {
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
		where: Prisma.PersonalLibraryGameWhereInput,
		search?: Record<string, unknown>
	): void {
		if (search && Object.keys(search).length > 0) {
			if (where.AND) {
				const existingAnd = Array.isArray(where.AND) ? where.AND : [where.AND];
				where.AND = [
					...existingAnd,
					search as Prisma.PersonalLibraryGameWhereInput
				];
			} else {
				where.AND = [search as Prisma.PersonalLibraryGameWhereInput];
			}
		}
	}
}
