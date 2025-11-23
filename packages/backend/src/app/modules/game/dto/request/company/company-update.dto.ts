import { Exclude, Expose, Type } from 'class-transformer';
import {
	IsDate,
	IsInt,
	IsOptional,
	IsString
} from 'class-validator';

@Exclude()
export class CompanyUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	name?: string;

	@IsOptional()
	@IsString()
	@Expose()
	slug?: string;

	@IsOptional()
	@IsInt()
	@Expose()
	country?: number;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@Expose()
	startDate?: Date;

	constructor(partial: Partial<CompanyUpdateDto>) {
		Object.assign(this, partial);
	}
}

