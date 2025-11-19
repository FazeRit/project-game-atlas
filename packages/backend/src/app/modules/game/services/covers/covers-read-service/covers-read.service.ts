import { Cover } from '@prisma/client';
import { ICoverReadRepository } from '../../../repositories/covers/abstracts/icover-read.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoversReadService {
	constructor(
		private readonly coverReadRepository: ICoverReadRepository,
	) {}

	async findById(checksum: string): Promise<Cover | null> {
		return this.coverReadRepository.findById(checksum);
	}
}

