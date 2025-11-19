import { Cover } from '@prisma/client';
import { CoverCreateDto, CoverUpdateDto } from '../../../dto';
import { ICoverWriteRepository } from '../abstracts/icover-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class CoverWriteRepository implements ICoverWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CoverCreateDto): Promise<Cover | null> {
		return this.prisma.cover.create({
			data
		});
	}

	async update(checksum: string, data: CoverUpdateDto): Promise<Cover | null> {
		return this.prisma.cover.update({
			where: {
				checksum
			},
			data
		})
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.cover.delete({
			where: {
				checksum
			}
		})
	}

	async createMany(data: Array<CoverCreateDto>): Promise<void> {
		await this.prisma.cover.createMany({
			data,
			skipDuplicates: true
		});
	}
}