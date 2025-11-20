import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaginationMetaDto {
    @Expose() page!: number;
    @Expose() pageSize!: number;
    @Expose() totalItems!: number;
    @Expose() totalPages!: number;
    @Expose() hasNext!: boolean;
    @Expose() hasPrev!: boolean;
}
