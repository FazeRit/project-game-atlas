import { ESortOrder } from "../enums";

export interface IApiBasePaginateDto<TSortField extends string> {
    page: number;
    limit: number;
    searchQuery?: string;
    sort?: `${TSortField}:${ESortOrder}`;
} 