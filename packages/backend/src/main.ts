import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
		snapshot: true
	});

	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);

	app.use(cookieParser())

	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					...helmet.contentSecurityPolicy.getDefaultDirectives(),
					"script-src": ["'self'", "'unsafe-inline'"],
					"style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
				},
			},
			crossOriginEmbedderPolicy: false, 
			crossOriginResourcePolicy: { policy: "cross-origin" },

			dnsPrefetchControl: {
				allow: false
			},
			frameguard: {
				action: "deny"
			},
			hidePoweredBy: true,
			strictTransportSecurity: {
				maxAge: 31536000,
				includeSubDomains: true,
				preload: true,
			},
			xContentTypeOptions: true,
			referrerPolicy: {
				policy: "strict-origin-when-cross-origin"
			},
		})
	);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: false,
		transform: true,
		transformOptions: {
			enableImplicitConversion: true,
			excludeExtraneousValues: true,
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

	app.enableCors({
		origin: process.env.FRONTEND_URL || 'http://localhost:3001',
		credentials: true,
		methods: 'GET, PUT, POST, DELETE, PATCH',
		allowedHeaders: 'Content-Type, Authorization',
	});

	const port = process.env.PORT || 3002;

	await app.listen(port);
}

bootstrap();
