export class ApiResponseDto<TData, TMeta = unknown> { 
    success: boolean;
    statusCode: number;
    data: TData;
    timestamp: string;
    path?: string;
    meta?: TMeta;

    constructor(
        data: {
            statusCode: number,
            data: TData,
            timestamp: string,
            success: boolean,
            path?: string
            meta?: TMeta
        }
    ) {
        this.success = data.success ?? true;
        this.statusCode = data.statusCode;
        this.data = data.data;
        this.timestamp = data.timestamp;
        this.path = data.path;
        this.meta = data.meta;
    }
}