export interface IApiResponse<TData, TMeta = undefined> {
    success: boolean;
    statusCode: number;
    data: TData; 
    meta?: TMeta;      
    timestamp?: string;
    path?: string;
}

export interface IApiErrorResponse {
    success: boolean;
    statusCode: number;
    data: {
        message: string | string[]; 
    };
    timestamp: string;
    path: string;
}