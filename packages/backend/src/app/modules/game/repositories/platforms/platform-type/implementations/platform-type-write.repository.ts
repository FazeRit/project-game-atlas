import { Injectable } from '@nestjs/common';
import { IPlatformTypeWriteRepository } from '../abstracts/iplatform-type-write.repository';
import { PlatformType } from '@prisma/client';
import { PlatformTypeCreateDto } from '../../../../dto/request/platform-type/platform-type-create.dto';
import { PlatformTypeUpdateDto } from '../../../../dto/request/platform-type/platform-type-update.dto';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class PlatformTypeWriteRepository implements IPlatformTypeWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: PlatformTypeCreateDto): Promise<PlatformType | null> {
		return this.prisma.platformType.create({
			data
		});
	}

	async update(checksum: string, data: PlatformTypeUpdateDto): Promise<PlatformType | null> {
		return this.prisma.platformType.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.platformType.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<PlatformTypeCreateDto>): Promise<void> {
		await this.prisma.platformType.createMany({
			data,
			skipDuplicates: true
		});
	}
}

