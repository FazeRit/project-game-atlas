import { ESortOrder } from '../../enums/sort-order.enum';
import { Expose } from 'class-transformer';

export class SortOrderDto {
    @Expose()
    field!: string;

    @Expose()
    order!: ESortOrder;
}