import { Cover } from '@prisma/client';
import { ICoverReadRepository } from '../abstracts/icover-read.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class CoverReadRepository implements ICoverReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<Cover | null> {
		return this.prisma.cover.findUnique({
			where: {
				checksum
			}
		})
	}
}