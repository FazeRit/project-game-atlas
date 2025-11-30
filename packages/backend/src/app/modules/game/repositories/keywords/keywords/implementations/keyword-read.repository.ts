import { IKeywordReadRepository } from '../abstracts/ikeyword-read.repository';
import { Injectable } from '@nestjs/common';
import { Keyword } from '@prisma/client';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { KeywordWhereBuilder } from '../../../../utils/keyword-where-builder.util';

@Injectable()
export class KeywordReadRepository implements IKeywordReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<Keyword | null> {
		return this.prisma.keyword.findUnique({
			where: {
				checksum
			}
		});
	}

	async findAll(
		page: number,
		limit: number,
		search?: Record<string, unknown>,
	): Promise<Array<Keyword>> {
		const where = KeywordWhereBuilder.build(search);
		const skip = (page - 1) * limit;

		return this.prisma.keyword.findMany({
			where: {
				...where,
				gameKeywords: {
					some: {
						game: {}
					}
				}
			},
			skip,
			take: limit,
		});
	}

	async count(): Promise<number> {
		return this.prisma.keyword.count();
	}
}

