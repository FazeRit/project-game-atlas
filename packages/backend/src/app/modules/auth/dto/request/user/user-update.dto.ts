import { Exclude, Expose } from 'class-transformer';
import {
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator';

@Exclude()
export class UserUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	username?: string;

	@IsOptional()
	@IsEmail()
	@Expose()
	email?: string;

	@IsOptional()
	@IsString()
	@MinLength(8)
	@MaxLength(32)
	@Expose()
	password?: string;

	@IsOptional()
	@Expose()
	tasteVector?: Record<string, number>;

	constructor(partial: Partial<UserUpdateDto>) {
		Object.assign(this, partial);
	}
}