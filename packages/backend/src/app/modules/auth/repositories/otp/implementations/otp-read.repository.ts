import { Injectable } from '@nestjs/common';
import { IOtpReadRepository } from '../abstracts/iotp-read.repository';
import { OtpResponseDto } from '../../../dto';
import { RedisService } from '../../../../redis/redis.service';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class OtpReadRepository implements IOtpReadRepository {
    private readonly prefix = 'otp:';

    constructor(
        private readonly redisService: RedisService,
    ) {}

    async findOneByEmail(email: string): Promise<OtpResponseDto | null> {
        const key = this.getKey(email);

        const code = await this.redisService.get(key);

        if (!code) {
            return null;
        }

        const plainObject = {
            email: email,
            code: code 
        };

        const result = plainToInstance(OtpResponseDto, plainObject);

        return result;
    }

    private getKey(identifier: string): string {
        return `${this.prefix}${identifier}`;
    }
}