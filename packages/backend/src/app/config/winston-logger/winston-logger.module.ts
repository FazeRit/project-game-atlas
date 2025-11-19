import { Module } from '@nestjs/common';
import { winstonLoggerConfig } from './config/winston-logger.config';
import { WinstonModule } from 'nest-winston';

@Module({
	imports: [
		WinstonModule.forRoot(winstonLoggerConfig),
	],
	exports: [WinstonModule],
})
export class WinstonLoggerModule {}

