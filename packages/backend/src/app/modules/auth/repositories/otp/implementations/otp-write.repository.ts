import { Injectable } from '@nestjs/common';
import { IOtpWriteRepository } from '../abstracts/iotp-write.repository';
import { Otp } from '@prisma/client';
import { OtpCreateDto, OtpUpdateDto } from '../../../dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class OtpWriteRepository implements IOtpWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: OtpCreateDto): Promise<Otp | null> {
		return this.prisma.otp.create({
			data
		});
	}

	async update(checksum: string, data: OtpUpdateDto): Promise<Otp | null> {
		return this.prisma.otp.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.otp.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<OtpCreateDto>): Promise<void> {
		await this.prisma.otp.createMany({
			data,
			skipDuplicates: true
		});
	}

	async deleteManyByUserId(userId: string): Promise<void> {
		await this.prisma.otp.deleteMany({
			where: {
				userId
			}
		});
	}
}

