import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import * as Redis from 'ioredis';
import redisConfig from '../../config/redis/redis.config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  public redisClient!: Redis.Redis;

  constructor(
    @Inject(redisConfig.KEY)
    private readonly redisConfiguration: ConfigType<typeof redisConfig>,
  ) { }

  onModuleInit() {
    const config = {
      host: this.redisConfiguration.host,
      port: this.redisConfiguration.port,
      username: this.redisConfiguration.username,
      password: this.redisConfiguration.password,
      url: this.redisConfiguration.url,
      retryDelayOnFailover: 100,
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
    };

    this.logger.log('Connecting to Redis...', config);

    this.redisClient = new Redis.Redis(config);

    this.redisClient.on('connect', () => {
      this.logger.log('Redis client connected successfully');
    });

    this.redisClient.on('error', (error) => {
      this.logger.error('Redis client error:', error);
    });
  }

  onModuleDestroy() {
    this.redisClient.quit();
    this.logger.log('Redis connection closed');
  }

  async set(
    key: string,
    value: any,
    ttl?: number
  ): Promise<string> {
    try {
      const stringValue =
        typeof value === 'object' ? JSON.stringify(value) : String(value);

      if (ttl) {
        return await this.redisClient.set(key, stringValue, 'EX', ttl);
      }

      return await this.redisClient.set(key, stringValue);
    } catch (error) {
      this.logger.error(`Error setting key "${key}":`, error);
      throw error;
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const value = await this.redisClient.get(key);
      if (!value) return null;

      try {
        return JSON.parse(value);
      } catch {
        return value as T;
      }
    } catch (error) {
      this.logger.error(`Error getting key "${key}":`, error);
      return null;
    }
  }
}