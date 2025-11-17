export class ApiResponseDto<T> {
	success: boolean;
	statusCode: number;
	data: T;
	timestamp: string;
	path?: string;

	constructor(
		statusCode: number,
		data: T,
		timestamp: string,
		success: boolean = true,
		path?: string
	) {
		this.success = success;
		this.statusCode = statusCode;
		this.data = data;
		this.timestamp = timestamp;
		this.path = path;
	}
}