import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

@Exclude()
export class OtpUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	code?: string;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@Expose()
	expiresAt?: Date;
}

