import { BadRequestException, Injectable } from '@nestjs/common';
import { Cover } from '@prisma/client';
import { CoverCreateDto } from '../../../dto/request/covers/cover-create.dto';
import { CoversReadService } from '../covers-read-service/covers-read.service';
import { CoverUpdateDto } from '../../../dto/request/covers/cover-update.dto';
import { ICoverWriteRepository } from '../../../repositories/covers/abstracts/icover-write.repository';

@Injectable()
export class CoversWriteService {
	constructor(
		private readonly coversReadService: CoversReadService,
		private readonly coverWriteRepository: ICoverWriteRepository,
	) {}

	async create(data: CoverCreateDto): Promise<Cover> {
		const cover = await this.coverWriteRepository.create(data);

		if (!cover) {
			throw new BadRequestException('Failed to create cover');
		}

		return cover;
	}

	async update(checksum: string, data: CoverUpdateDto): Promise<Cover> {
		const existingCover = await this.coversReadService.findById(checksum);

		if (!existingCover) {
			throw new BadRequestException('Cover not found');
		}

		const updatedCover = await this.coverWriteRepository.update(checksum, data);

		if (!updatedCover) {
			throw new BadRequestException('Failed to update cover');
		}

		return updatedCover;
	}

	async delete(checksum: string): Promise<void> {
		const existingCover = await this.coversReadService.findById(checksum);

		if (!existingCover) {
			throw new BadRequestException('Cover not found');
		}

		await this.coverWriteRepository.delete(checksum);
	}

	async createMany(data: Array<CoverCreateDto>): Promise<void> {
		await this.coverWriteRepository.createMany(data);
	}
}

