import { Injectable } from '@nestjs/common';
import { IPlatformTypeReadRepository } from '../../../../repositories/platforms/platform-type/abstracts/iplatform-type-read.repository';
import { PlatformType } from '@prisma/client';

@Injectable()
export class PlatformTypeReadService {
	constructor(
		private readonly platformTypeReadRepository: IPlatformTypeReadRepository,
	) {}

	async findById(checksum: string): Promise<PlatformType | null> {
		return this.platformTypeReadRepository.findById(checksum);
	}
}

