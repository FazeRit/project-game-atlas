import { Injectable } from '@nestjs/common';
import { IScreenshotsWriteRepository } from '../abstracts/iscreenshots-write.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Screenshots } from '@prisma/client';
import { ScreenshotsCreateDto } from '../../../dto/request/screenshots/screenshots-create.dto';
import { ScreenshotsUpdateDto } from '../../../dto/request/screenshots/screenshots-update.dto';

@Injectable()
export class ScreenshotsWriteRepository implements IScreenshotsWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: ScreenshotsCreateDto): Promise<Screenshots | null> {
		return this.prisma.screenshots.create({
			data
		});
	}

	async update(checksum: string, data: ScreenshotsUpdateDto): Promise<Screenshots | null> {
		return this.prisma.screenshots.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.screenshots.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<ScreenshotsCreateDto>): Promise<void> {
		await this.prisma.screenshots.createMany({
			data,
			skipDuplicates: true
		});
	}
}

