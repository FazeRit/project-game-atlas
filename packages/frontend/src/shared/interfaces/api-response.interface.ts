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

export interface IApiPaginateResponseMeta {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}