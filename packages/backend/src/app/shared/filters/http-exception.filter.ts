import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ApiResponseDto } from "../dto/api-response.dto";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const {
			httpAdapter
		} = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = new ApiResponseDto(
			httpStatus,
			{},
			new Date().toISOString(),
			false,
			httpAdapter.getRequestUrl(ctx.getRequest()),
		)

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
	}
}

