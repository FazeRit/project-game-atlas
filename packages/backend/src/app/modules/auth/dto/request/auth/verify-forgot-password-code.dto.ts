import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class VerifyForgotPasswordCodeDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	email!: string

	@IsString()
	@IsNotEmpty()
	@Expose()
	code!: string
}