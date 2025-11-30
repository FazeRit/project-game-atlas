import { BadRequestException, Injectable } from '@nestjs/common';
import { IKeywordWriteRepository } from '../../../../repositories/keywords/keywords/abstracts/ikeyword-write.repository';
import { Keyword } from '@prisma/client';
import { KeywordCreateDto, KeywordUpdateDto } from '../../../../dto';
import { KeywordsReadService } from '../keywords-read-service/keywords-read.service';

@Injectable()
export class KeywordsWriteService {
	constructor(
		private readonly keywordsReadService: KeywordsReadService,
		private readonly keywordWriteRepository: IKeywordWriteRepository,
	) { }

	async create(data: KeywordCreateDto): Promise<Keyword> {
		const keyword = await this.keywordWriteRepository.create(data);

		if (!keyword) {
			throw new BadRequestException('Failed to create keyword');
		}

		return keyword;
	}

	async update(checksum: string, data: KeywordUpdateDto): Promise<Keyword> {
		const existingKeyword = await this.keywordsReadService.findById(checksum);

		if (!existingKeyword) {
			throw new BadRequestException('Keyword not found');
		}

		const updatedKeyword = await this.keywordWriteRepository.update(checksum, data);

		if (!updatedKeyword) {
			throw new BadRequestException('Failed to update keyword');
		}

		return updatedKeyword;
	}

	async delete(checksum: string): Promise<void> {
		const existingKeyword = await this.keywordsReadService.findById(checksum);

		if (!existingKeyword) {
			throw new BadRequestException('Keyword not found');
		}

		await this.keywordWriteRepository.delete(checksum);
	}

	async createMany(data: Array<KeywordCreateDto>): Promise<void> {
		await this.keywordWriteRepository.createMany(data);
	}
}

