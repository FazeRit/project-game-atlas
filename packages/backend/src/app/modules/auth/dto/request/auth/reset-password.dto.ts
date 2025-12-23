import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class ResetPasswordDto {
	@IsEmail()
	@IsNotEmpty()
	@Expose()
	email!: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	code!: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	newPassword!: string;
}