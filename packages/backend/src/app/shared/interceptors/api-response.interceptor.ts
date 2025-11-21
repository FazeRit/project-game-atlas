import { ApiResponseDto } from '../dto/response/api-response.dto';
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor<T>
	implements NestInterceptor<T, ApiResponseDto<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<ApiResponseDto<T>> {
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest();
		const response = httpContext.getResponse();

		const statusCode = response.statusCode;
		const path = request.url;

		return next.handle().pipe(
			map((data) => {
				return new ApiResponseDto(
					statusCode,
					data,
					new Date().toISOString(),
					true,
					path
				)
			})
		)
	}
}