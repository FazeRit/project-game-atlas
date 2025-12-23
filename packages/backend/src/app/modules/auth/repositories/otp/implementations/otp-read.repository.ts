import { Injectable } from '@nestjs/common';
import { IOtpReadRepository } from '../abstracts/iotp-read.repository';
import { OtpResponseDto } from '../../../dto';
import { RedisService } from '../../../../redis/redis.service';

@Injectable()
export class OtpReadRepository implements IOtpReadRepository {
    private readonly prefix = 'otp:';

    constructor(
        private readonly redisService: RedisService,
    ) {}

    async findOneByEmail(email: string): Promise<OtpResponseDto | null> {
        const key = this.getKey(email);
        const otp = await this.redisService.get(key);

        if (!otp) {
            return null;
        }

        return otp;
    }

    private getKey(identifier: string): string {
        return `${this.prefix}${identifier}`;
    }
}