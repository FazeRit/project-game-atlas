import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Exclude()
export class OtpCreateDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	userId!: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	code!: string;

	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	@Expose()
	expiresAt!: Date;
}

