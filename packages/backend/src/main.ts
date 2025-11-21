import cookieParser from 'cookie-parser';
import { ApiResponseInterceptor } from './app/shared/interceptors/api-response.interceptor';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);

	app.use(cookieParser())

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: false,
		transform: true,
		transformOptions: {
			enableImplicitConversion: true,
		},
		disableErrorMessages: false,
		stopAtFirstError: false,
		exceptionFactory: (errors) => {
			const messages = errors.map(error => {
				const constraints = error.constraints;
				if (constraints) {
					return Object.values(constraints).join(', ');
				}
				return `${error.property} has invalid value`;
			});
			return new BadRequestException(messages);
		},
	}),);

	app.useGlobalInterceptors(new ApiResponseInterceptor())

	app.enableCors({
		origin: '*',
		methods: 'GET, PUT, POST, DELETE, PATCH',
		allowedHeaders: 'Content-Type, Authorization',
	});

	const port = process.env.PORT || 3002;

	await app.listen(port);
}

bootstrap();
