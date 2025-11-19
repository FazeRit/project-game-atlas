import { ApiResponseDto } from '../dto/api-response.dto';
import {
	ArgumentsHost,
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

		const errorMessage = exception instanceof Error ? exception.message : 'An error occurred while processing the request';
		const errorStack = exception instanceof Error ? exception.stack : undefined;
		const url = httpAdapter.getRequestUrl(request);
		const method = request.method;

		if (httpStatus >= 500) {
			this.logger.error(
				`${method} ${url} - ${httpStatus} - ${errorMessage}`,
				errorStack
			);
		} else if (httpStatus >= 400) {
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

