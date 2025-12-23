import { Exclude, Expose } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class VerifyForgotPasswordCodeDto {
	@IsString()
	@IsEmpty()
	@Expose()
	email!: string

	@IsString()
	@IsNotEmpty()
	@Expose()
	code!: string
}