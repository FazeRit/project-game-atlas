import { Injectable } from '@nestjs/common';
import { IPlatformWriteRepository } from '../abstracts/iplatform-write.repository';
import { Platform } from '@prisma/client';
import { PlatformCreateDto } from '../../../../dto/request/platform/platform-create.dto';
import { PlatformUpdateDto } from '../../../../dto/request/platform/platform-update.dto';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class PlatformWriteRepository implements IPlatformWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: PlatformCreateDto): Promise<Platform | null> {
		return this.prisma.platform.create({
			data
		});
	}

	async update(checksum: string, data: PlatformUpdateDto): Promise<Platform | null> {
		return this.prisma.platform.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.platform.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<PlatformCreateDto>): Promise<void> {
		await this.prisma.platform.createMany({
			data,
			skipDuplicates: true
		});
	}
}

