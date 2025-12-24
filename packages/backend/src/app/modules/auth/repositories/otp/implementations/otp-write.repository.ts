import { Injectable } from '@nestjs/common';
import { IOtpWriteRepository } from '../abstracts/iotp-write.repository';
import { OtpCreateDto, OtpUpdateDto } from '../../../dto';
import { RedisService } from '../../../../redis/redis.service';

@Injectable()
export class OtpWriteRepository implements IOtpWriteRepository {
    private readonly prefix = 'otp:';

    constructor(
        private readonly redisService: RedisService,
    ) {}

    async create(data: OtpCreateDto): Promise<void> {
        const key = this.getKey(data.email);

        await this.redisService.set(key, data.code, 300);
    }

    async update(data: OtpUpdateDto, email: string): Promise<void> {
        const key = this.getKey(email);
        if (data.code) {
            await this.redisService.set(key, data.code, 300);
        }
    }

    async delete(email: string): Promise<void> {
        const key = this.getKey(email);
        await this.redisService.delete(key);
    }

    async createMany(data: Array<OtpCreateDto>): Promise<void> {
        const promises = data.map(item => this.create(item));
        await Promise.all(promises);
    }

    async deleteManyByEmail(email: string): Promise<void> {
        const key = this.getKey(email);
        await this.redisService.delete(key);
    }

    private getKey(identifier: string): string {
        return `${this.prefix}${identifier}`;
    }
}