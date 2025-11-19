import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class ForgotPasswordDto {
	@IsEmail()
	@IsNotEmpty()
	@Expose()
	email!: string;
}