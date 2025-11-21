import { Expose, Type } from 'class-transformer';
import {
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min
} from 'class-validator';

export class BasePaginateDto {
    @Expose()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;

    @Expose()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number;

    @Expose()
    @IsString()
    @IsOptional()
    searchQuery?: string;

    // @Expose()
    // @IsOptional()
    // @IsString()
    // sort?: string;

    constructor(data?: {
        page?: number;
        limit?: number;
        searchQuery?: string;
        sort?: string;
    }) {
        this.page = data?.page || 1;
        this.limit = data?.limit || 10;
        this.searchQuery = data?.searchQuery;
        // this.sort = data?.sort;
    }
}