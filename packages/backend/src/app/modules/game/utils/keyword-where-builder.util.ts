import { Prisma } from '@prisma/client';

export class KeywordWhereBuilder {
	static build(
		search?: Record<string, unknown>
	): Prisma.KeywordWhereInput {
		const where: Prisma.KeywordWhereInput = {};

		KeywordWhereBuilder.applySearchFilter(where, search);

		return where;
	}

	private static applySearchFilter(
		where: Prisma.KeywordWhereInput,
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
