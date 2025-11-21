import { BadRequestException, Injectable } from '@nestjs/common';
import { IPlatformTypeWriteRepository } from '../../../../repositories/platforms/platform-type/abstracts/iplatform-type-write.repository';
import { PlatformType } from '@prisma/client';
import { PlatformTypeCreateDto } from '../../../../dto/request/platform-type/platform-type-create.dto';
import { PlatformTypeReadService } from '../platform-type-read-service/platform-type-read.service';
import { PlatformTypeUpdateDto } from '../../../../dto/request/platform-type/platform-type-update.dto';

@Injectable()
export class PlatformTypeWriteService {
	constructor(
		private readonly platformTypeReadService: PlatformTypeReadService,
		private readonly platformTypeWriteRepository: IPlatformTypeWriteRepository,
	) {}

	async create(data: PlatformTypeCreateDto): Promise<PlatformType> {
		const platformType = await this.platformTypeWriteRepository.create(data);

		if (!platformType) {
			throw new BadRequestException('Failed to create platform type');
		}

		return platformType;
	}

	async update(checksum: string, data: PlatformTypeUpdateDto): Promise<PlatformType> {
		const existingPlatformType = await this.platformTypeReadService.findById(checksum);

		if (!existingPlatformType) {
			throw new BadRequestException('Platform type not found');
		}

		const updatedPlatformType = await this.platformTypeWriteRepository.update(checksum, data);

		if (!updatedPlatformType) {
			throw new BadRequestException('Failed to update platform type');
		}

		return updatedPlatformType;
	}

	async delete(checksum: string): Promise<void> {
		const existingPlatformType = await this.platformTypeReadService.findById(checksum);

		if (!existingPlatformType) {
			throw new BadRequestException('Platform type not found');
		}

		await this.platformTypeWriteRepository.delete(checksum);
	}

	async createMany(data: Array<PlatformTypeCreateDto>): Promise<void> {
		await this.platformTypeWriteRepository.createMany(data);
	}
}

