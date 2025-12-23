import * as crypto from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IOtpReadRepository } from '../../repositories/otp/abstracts/iotp-read.repository';
import { IOtpWriteRepository } from '../../repositories/otp/abstracts/iotp-write.repository';
import { OtpCreateDto, OtpResponseDto } from '../../dto';

@Injectable()
export class OtpService {
    private readonly OTP_TTL_SECONDS = 3600;

    constructor(
        private readonly otpReadRepository: IOtpReadRepository,
        private readonly otpWriteRepository: IOtpWriteRepository,
    ) {}

    private generateNumericOtp(): string {
        const min = 100000;
        const max = 999999;
        return crypto.randomInt(min, max + 1).toString();
    }

    async createOtp(email: string): Promise<OtpResponseDto> {
        const code = this.generateNumericOtp();

		const otp = new OtpCreateDto({
            email,
            code,
            expiresAt: new Date(Date.now() + this.OTP_TTL_SECONDS * 1000),
        });

        await this.otpWriteRepository.create(otp, this.OTP_TTL_SECONDS)

        return otp;
    }

    async validateOtp(
        email: string,
        code: string,
        shouldDelete: boolean = true
    ): Promise<OtpResponseDto> {
        const otp = await this.otpReadRepository.findOneByEmail(email);

        if (!otp) {
            throw new BadRequestException('Invalid or expired OTP code');
        }

        if (otp.code !== code) {
            throw new BadRequestException('Invalid OTP code');
        }

        if(shouldDelete) {
            await this.otpWriteRepository.delete(email);
        }

        return otp;
    }

    async deleteOtp(email: string): Promise<void> {
        await this.otpWriteRepository.delete(email);
    }
}