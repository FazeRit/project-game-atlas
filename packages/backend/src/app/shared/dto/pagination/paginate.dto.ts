import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationMetaDto } from './paginate-meta.dto';

@Exclude()
export class PaginatedResponseDto<TData, TMeta extends PaginationMetaDto> {
    @Expose()
    @Type(() => Object)
    data!: TData[];

    @Expose()
    @Type(() => Object)
    meta!: TMeta;
}