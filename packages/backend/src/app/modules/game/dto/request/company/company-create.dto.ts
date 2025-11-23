import { Exclude, Expose, Type } from 'class-transformer';
import {
	IsDate,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString
} from 'class-validator';

@Exclude()
export class CompanyCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	name: string;

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

	constructor(data: {
		checksum?: string;
		name: string;
		slug?: string;
		country?: number;
		startDate?: Date;
	}) {
		this.checksum = data.checksum;
		this.name = data.name;
		this.slug = data.slug;
		this.country = data.country;
		this.startDate = data.startDate;
	}
}

