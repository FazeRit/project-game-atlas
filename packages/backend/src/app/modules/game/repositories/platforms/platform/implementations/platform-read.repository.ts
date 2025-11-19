import { Injectable } from '@nestjs/common';
import { IPlatformReadRepository } from '../abstracts/iplatform-read.repository';
import { Platform } from '@prisma/client';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class PlatformReadRepository implements IPlatformReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<Platform | null> {
		return this.prisma.platform.findUnique({
			where: {
				checksum
			}
		});
	}
}

