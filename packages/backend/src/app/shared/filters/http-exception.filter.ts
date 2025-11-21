import { ApiResponseDto } from '../dto/response/api-response.dto';
import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
	private readonly logger = new Logger(HttpExceptionFilter.name);

	constructor(
		private readonly httpAdapterHost: HttpAdapterHost,
	) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const {
			httpAdapter
		} = this.httpAdapterHost;

		const ctx = host.switchToHttp();
		const request = ctx.getRequest();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let errorMessage = exception instanceof Error ? exception.message : 'An error occurred while processing the request';
		const errorStack = exception instanceof Error ? exception.stack : undefined;
		const url = httpAdapter.getRequestUrl(request);
		const method = request.method;

		if (exception instanceof BadRequestException) {
			const response = exception.getResponse();
			if (typeof response === 'object' && response !== null) {
				const validationErrors = (response as any).message;
				if (Array.isArray(validationErrors)) {
					this.logger.warn(
						`${method} ${url} - ${httpStatus} - Validation errors:`,
						JSON.stringify(validationErrors, null, 2)
					);
					this.logger.warn(
						`Query params:`,
						JSON.stringify(request.query, null, 2)
					);
					errorMessage = validationErrors.join(', ');
				} else if (typeof validationErrors === 'string') {
					this.logger.warn(
						`${method} ${url} - ${httpStatus} - ${validationErrors}`
					);
					this.logger.warn(
						`Query params:`,
						JSON.stringify(request.query, null, 2)
					);
					errorMessage = validationErrors;
				}
			}
		}

		if (httpStatus >= 500) {
			this.logger.error(
				`${method} ${url} - ${httpStatus} - ${errorMessage}`,
				errorStack
			);
		} else if (httpStatus >= 400 && !(exception instanceof BadRequestException)) {
			this.logger.warn(
				`${method} ${url} - ${httpStatus} - ${errorMessage}`
			);
		}

		const responseBody = new ApiResponseDto(
			httpStatus,
			{
				message: errorMessage,
			},
			new Date().toISOString(),
			false,
			url,
		)

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
	}
}

