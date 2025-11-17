import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './config/winston-logger/winston-logger.config';
@Module({
	imports: [
		WinstonModule.forRoot(winstonLoggerConfig),
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		}
	],
})
export class AppModule {}