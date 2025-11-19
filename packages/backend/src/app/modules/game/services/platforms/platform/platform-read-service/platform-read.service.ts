import { Injectable } from '@nestjs/common';
import { IPlatformReadRepository } from '../../../../repositories/platforms/platform/abstracts/iplatform-read.repository';
import { Platform } from '@prisma/client';

@Injectable()
export class PlatformReadService {
	constructor(
		private readonly platformReadRepository: IPlatformReadRepository,
	) {}

	async findById(checksum: string): Promise<Platform | null> {
		return this.platformReadRepository.findById(checksum);
	}
}

