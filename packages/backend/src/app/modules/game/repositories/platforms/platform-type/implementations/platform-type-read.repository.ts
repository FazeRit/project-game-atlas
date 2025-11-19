import { Injectable } from '@nestjs/common';
import { IPlatformTypeReadRepository } from '../abstracts/iplatform-type-read.repository';
import { PlatformType } from '@prisma/client';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class PlatformTypeReadRepository implements IPlatformTypeReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<PlatformType | null> {
		return this.prisma.platformType.findUnique({
			where: {
				checksum
			}
		});
	}
}

