import { IKeywordReadRepository } from '../../../../repositories/keywords/keywords/abstracts/ikeyword-read.repository';
import { Injectable } from '@nestjs/common';
import { Keyword } from '@prisma/client';
import { KeywordResponseDto } from '../../../../dto';
import { KeywordsMapService } from '../keywords-map-service/keywords-map.service';
import { PaginationMetaDto } from '../../../../../../shared/dto/request/pagination/paginate-meta.dto';
import { PaginatedResponseDto } from '../../../../../../shared/dto/request/pagination/paginate.dto';

@Injectable()
export class KeywordsReadService {
	constructor(
		private readonly keywordReadRepository: IKeywordReadRepository,
		private readonly keywordsMapService: KeywordsMapService,
	) { }

	async findById(checksum: string): Promise<Keyword | null> {
		return this.keywordReadRepository.findById(checksum);
	}

	async findAll(
		page: number,
		limit: number,
		search?: Record<string, unknown>,
	): Promise<PaginatedResponseDto<KeywordResponseDto, PaginationMetaDto>> {
		const [keywords, totalItems] = await Promise.all([
			this.keywordReadRepository.findAll(page, limit),
			this.keywordReadRepository.count(),
		]);

		const totalPages = Math.ceil(totalItems / limit);

		const meta = new PaginationMetaDto();
		
		meta.page = page;
		meta.pageSize = limit;
		meta.totalItems = totalItems;
		meta.totalPages = totalPages;
		meta.hasNext = page < totalPages;
		meta.hasPrev = page > 1;

		const data = keywords.map(
			keyword => this.keywordsMapService.toKeywordResponse(keyword)
		);

		return {
			data,
			meta,
		};
	}
}

