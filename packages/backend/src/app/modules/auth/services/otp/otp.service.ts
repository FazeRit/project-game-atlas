import * as crypto from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IOtpReadRepository } from '../../repositories/otp/abstracts/iotp-read.repository';
import { IOtpWriteRepository } from '../../repositories/otp/abstracts/iotp-write.repository';
import { Otp } from '@prisma/client';

@Injectable()
export class OtpService {
	private readonly OTP_EXPIRY_HOURS = 1;

	constructor(
		private readonly otpReadRepository: IOtpReadRepository,
		private readonly otpWriteRepository: IOtpWriteRepository,
	) {}

	private generateNumericOtp(): string {
		const min = 100000;
		const max = 999999;

		const code = crypto.randomInt(min, max + 1).toString();
		return code;
	}

	async createOtp(userId: string): Promise<Otp> {
		await this.otpWriteRepository.deleteManyByUserId(userId);

		const code = this.generateNumericOtp();

		const expiresAt = new Date();

		expiresAt.setHours(expiresAt.getHours() + this.OTP_EXPIRY_HOURS);

		const otp = await this.otpWriteRepository.create({
			userId,
			code,
			expiresAt,
		});

		if (!otp) {
			throw new BadRequestException('Failed to create OTP');
		}

		return otp;
	}

	async validateOtp(code: string): Promise<Otp> {
		const otp = await this.otpReadRepository.findByCode(code);

		if (!otp) {
			throw new BadRequestException('Invalid or expired OTP code');
		}

		if (otp.expiresAt < new Date()) {
			await this.otpWriteRepository.delete(otp.checksum);

			throw new BadRequestException('OTP code has expired');
		}

		return otp;
	}

	async deleteOtp(checksum: string): Promise<void> {
		await this.otpWriteRepository.delete(checksum);
	}
}

