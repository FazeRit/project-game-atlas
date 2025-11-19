import { ConfigService } from '@nestjs/config';
import { EnvEnum } from '../enums/env.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService {
    constructor(private readonly configService: ConfigService) {}

    get(key: EnvEnum): string {
        return this.configService.getOrThrow(key);
    }
}