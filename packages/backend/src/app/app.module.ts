import { AnalyticsModule } from './modules/analytics/analytics.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AtAuthGuard } from './modules/auth/guards/at.guard';
import { AuthModule } from './modules/auth/auth.module';
import { EnvModule } from './config/env/env.module';
import { GameModule } from './modules/game/game.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { Module } from '@nestjs/common';
import { PersonalLibraryModule } from './modules/personal-library/personal-library.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { WinstonLoggerModule } from './config/winston-logger/winston-logger.module';
import { RedisModule } from './modules/redis/redis.module';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		WinstonLoggerModule,
		EnvModule,
		PrismaModule,
		RedisModule,
		BullModule.forRoot({
			connection: {
				host: 'localhost',
				port: 6379
			}
		}),
		ThrottlerModule.forRoot({
			throttlers: [
				{
					ttl: 60000,
					limit: 10,
				},
			],
		}),
		ScheduleModule.forRoot(),
		GameModule,
		AuthModule,
		AnalyticsModule,
		PersonalLibraryModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		},
		{
			provide: APP_GUARD,
			useClass: AtAuthGuard
		}
	],
})
export class AppModule {}