import { BadRequestException, Injectable } from '@nestjs/common';
import { IScreenshotsWriteRepository } from '../../../repositories/screenshots/abstracts/iscreenshots-write.repository';
import { Screenshots } from '@prisma/client';
import { ScreenshotsCreateDto } from '../../../dto/request/screenshots/screenshots-create.dto';
import { ScreenshotsReadService } from '../screenshots-read-service/screenshots-read.service';
import { ScreenshotsUpdateDto } from '../../../dto/request/screenshots/screenshots-update.dto';

@Injectable()
export class ScreenshotsWriteService {
	constructor(
		private readonly screenshotsReadService: ScreenshotsReadService,
		private readonly screenshotsWriteRepository: IScreenshotsWriteRepository,
	) {}

	async create(data: ScreenshotsCreateDto): Promise<Screenshots> {
		const screenshot = await this.screenshotsWriteRepository.create(data);

		if (!screenshot) {
			throw new BadRequestException('Failed to create screenshot');
		}

		return screenshot;
	}

	async update(checksum: string, data: ScreenshotsUpdateDto): Promise<Screenshots> {
		const existingScreenshot = await this.screenshotsReadService.findById(checksum);

		if (!existingScreenshot) {
			throw new BadRequestException('Screenshot not found');
		}

		const updatedScreenshot = await this.screenshotsWriteRepository.update(checksum, data);

		if (!updatedScreenshot) {
			throw new BadRequestException('Failed to update screenshot');
		}

		return updatedScreenshot;
	}

	async delete(checksum: string): Promise<void> {
		const existingScreenshot = await this.screenshotsReadService.findById(checksum);

		if (!existingScreenshot) {
			throw new BadRequestException('Screenshot not found');
		}

		await this.screenshotsWriteRepository.delete(checksum);
	}

	async createMany(data: Array<ScreenshotsCreateDto>): Promise<void> {
		await this.screenshotsWriteRepository.createMany(data);
	}
}

