import { Injectable } from '@nestjs/common';
import { IOtpReadRepository } from '../abstracts/iotp-read.repository';
import { Otp } from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class OtpReadRepository implements IOtpReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<Otp | null> {
		return this.prisma.otp.findUnique({
			where: {
				checksum
			}
		});
	}

	async findByCode(code: string): Promise<Otp | null> {
		return this.prisma.otp.findFirst({
			where: {
				code
			}
		});
	}
}

