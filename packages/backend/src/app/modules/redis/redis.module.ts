import { Global, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { ConfigModule } from "@nestjs/config";
import redisConfig from "../../config/redis/redis.config";

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(redisConfig)
  ],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}