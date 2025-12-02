import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonLoggerConfig = {
    transports: [
		new winston.transports.Console({
			level: 'debug',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.ms(),
				nestWinstonModuleUtilities.format.nestLike('MyApp', {
					colors: true,
					prettyPrint: true,
					processId: true,
					appName: true,
				}),
			),
		}),
	],
}