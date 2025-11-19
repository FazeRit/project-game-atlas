import { BadRequestException, Injectable } from '@nestjs/common';
import { IPlatformReadRepository } from '../../../../repositories/platforms/platform/abstracts/iplatform-read.repository';
import { IPlatformWriteRepository } from '../../../../repositories/platforms/platform/abstracts/iplatform-write.repository';
import { Platform } from '@prisma/client';
import { PlatformCreateDto } from '../../../../dto/request/platform/platform-create.dto';
import { PlatformUpdateDto } from '../../../../dto/request/platform/platform-update.dto';

@Injectable()
export class PlatformWriteService {
	constructor(
		private readonly platformReadRepository: IPlatformReadRepository,
		private readonly platformWriteRepository: IPlatformWriteRepository,
	) {}

	async create(data: PlatformCreateDto): Promise<Platform> {
		const platform = await this.platformWriteRepository.create(data);

		if (!platform) {
			throw new BadRequestException('Failed to create platform');
		}

		return platform;
	}

	async update(checksum: string, data: PlatformUpdateDto): Promise<Platform> {
		const existingPlatform = await this.platformReadRepository.findById(checksum);

		if (!existingPlatform) {
			throw new BadRequestException('Platform not found');
		}

		const updatedPlatform = await this.platformWriteRepository.update(checksum, data);

		if (!updatedPlatform) {
			throw new BadRequestException('Failed to update platform');
		}

		return updatedPlatform;
	}

	async delete(checksum: string): Promise<void> {
		const existingPlatform = await this.platformReadRepository.findById(checksum);

		if (!existingPlatform) {
			throw new BadRequestException('Platform not found');
		}

		await this.platformWriteRepository.delete(checksum);
	}

	async createMany(data: Array<PlatformCreateDto>): Promise<void> {
		await this.platformWriteRepository.createMany(data);
	}
}

