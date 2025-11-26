import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class JwtTokenPayloadDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	checksum!: string;

	@IsEmail()
	@IsNotEmpty()
	@Expose()
	email!: string;
}