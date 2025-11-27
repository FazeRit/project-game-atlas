import { EPlayStatus, ETierRank } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@Exclude()
export class PersonalLibraryGameUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	gameId?: string;

	@IsOptional()
	@IsString()
	@Expose()
	personalLibraryId?: string;

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

	constructor(partial: Partial<PersonalLibraryGameUpdateDto>) {
		Object.assign(this, partial);
	}
}

