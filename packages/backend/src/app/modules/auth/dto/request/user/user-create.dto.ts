import { Exclude, Expose } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator';

@Exclude()
export class UserCreateDto {
	@IsEmail()
	@IsNotEmpty()
	@Expose()
	email!: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(32)
	@Expose()
	password!: string;
}