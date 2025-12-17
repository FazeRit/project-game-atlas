import { Exclude, Expose } from 'class-transformer';
import {
	IsDateString,
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator';

@Exclude()
export class UserUpdateDto {
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

	@IsOptional()
    @IsDateString()
    @Expose()
    lastAccessedAt?: string;

	constructor(partial: Partial<UserUpdateDto>) {
		Object.assign(this, partial);
	}
}