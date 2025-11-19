import { BadRequestException, Injectable } from '@nestjs/common';
import { IPlatformTypeReadRepository } from '../../../../repositories/platforms/platform-type/abstracts/iplatform-type-read.repository';
import { IPlatformTypeWriteRepository } from '../../../../repositories/platforms/platform-type/abstracts/iplatform-type-write.repository';
import { PlatformType } from '@prisma/client';
import { PlatformTypeCreateDto } from '../../../../dto/request/platform-type/platform-type-create.dto';
import { PlatformTypeUpdateDto } from '../../../../dto/request/platform-type/platform-type-update.dto';

@Injectable()
export class PlatformTypeWriteService {
	constructor(
		private readonly platformTypeReadRepository: IPlatformTypeReadRepository,
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
		const existingPlatformType = await this.platformTypeReadRepository.findById(checksum);

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
		const existingPlatformType = await this.platformTypeReadRepository.findById(checksum);

		if (!existingPlatformType) {
			throw new BadRequestException('Platform type not found');
		}

		await this.platformTypeWriteRepository.delete(checksum);
	}

	async createMany(data: Array<PlatformTypeCreateDto>): Promise<void> {
		await this.platformTypeWriteRepository.createMany(data);
	}
}

