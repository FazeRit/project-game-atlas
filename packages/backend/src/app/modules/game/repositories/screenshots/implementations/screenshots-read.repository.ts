import { Injectable } from '@nestjs/common';
import { IScreenshotsReadRepository } from '../abstracts/iscreenshots-read.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Screenshots } from '@prisma/client';

@Injectable()
export class ScreenshotsReadRepository implements IScreenshotsReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<Screenshots | null> {
		return this.prisma.screenshots.findUnique({
			where: {
				checksum
			}
		});
	}
}

