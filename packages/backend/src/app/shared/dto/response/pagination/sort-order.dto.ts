import { ESortOrder } from '../../../enums/sort-order.enum';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export class SortOrderDto {
    @Expose()
    @IsString()
    field!: string;

    @Expose()
    @IsEnum(ESortOrder)
    order!: ESortOrder;

    constructor(field: string, order: ESortOrder) {
        this.field = field;
        this.order = order;
    }
}