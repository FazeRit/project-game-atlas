import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class ResetPasswordDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	code!: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	newPassword!: string;
}