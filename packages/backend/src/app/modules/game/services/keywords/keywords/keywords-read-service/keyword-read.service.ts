import { IKeywordReadRepository } from '../../../../repositories/keywords/keywords/abstracts/ikeyword-read.repository';
import { Injectable } from '@nestjs/common';
import { Keyword } from '@prisma/client';

@Injectable()
export class KeywordReadService {
	constructor(
		private readonly keywordReadRepository: IKeywordReadRepository,
	) {}

	async findById(checksum: string): Promise<Keyword | null> {
		return this.keywordReadRepository.findById(checksum);
	}
}

