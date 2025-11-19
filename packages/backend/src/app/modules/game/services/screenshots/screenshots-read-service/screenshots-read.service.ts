import { Injectable } from '@nestjs/common';
import { IScreenshotsReadRepository } from '../../../repositories/screenshots/abstracts/iscreenshots-read.repository';
import { Screenshots } from '@prisma/client';

@Injectable()
export class ScreenshotsReadService {
	constructor(
		private readonly screenshotsReadRepository: IScreenshotsReadRepository,
	) {}

	async findById(checksum: string): Promise<Screenshots | null> {
		return this.screenshotsReadRepository.findById(checksum);
	}
}

