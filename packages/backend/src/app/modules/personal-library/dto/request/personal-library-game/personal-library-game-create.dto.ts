import { EPlayStatus, ETierRank } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString
} from 'class-validator';

@Exclude()
export class PersonalLibraryGameCreateDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	gameId!: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	personalLibraryId!: string;

	@IsOptional()
	@IsEnum(EPlayStatus)
	@Expose()
	status?: EPlayStatus;

	@IsOptional()
	@IsEnum(ETierRank)
	@Expose()
	rank?: ETierRank;

	@IsOptional()
	@IsString()
	@Expose()
	note?: string;
}

