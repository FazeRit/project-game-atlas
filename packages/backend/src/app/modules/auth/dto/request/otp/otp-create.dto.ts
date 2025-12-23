import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Exclude()
export class OtpCreateDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	email!: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	code!: string;

	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	@Expose()
	expiresAt!: Date;

	constructor(data: {
		email: string;
		code: string;
		expiresAt: Date;
	}) {
		this.email = data.email;
		this.code = data.code;
		this.expiresAt = data.expiresAt
	}
}

