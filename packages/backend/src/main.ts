import cookieParser from 'cookie-parser';
import { ApiResponseInterceptor } from './app/shared/interceptors/api-response.interceptor';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
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
		forbidNonWhitelisted: true,
		transform: true,
		disableErrorMessages: false,
		stopAtFirstError: false,
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
