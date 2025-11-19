import { IKeywordReadRepository } from '../abstracts/ikeyword-read.repository';
import { Injectable } from '@nestjs/common';
import { Keyword } from '@prisma/client';
import { PrismaService } from '../../../../../prisma/prisma.service';

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
}

