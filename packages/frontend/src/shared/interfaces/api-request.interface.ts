import { ESortOrder } from "../enums";

export interface IApiBasePaginateDto<TSearchField, TSortField extends string> {
    page: number;
    limit: number;
    searchQuery?: TSearchField;
    sort?: `${TSortField}:${ESortOrder}`;
} 