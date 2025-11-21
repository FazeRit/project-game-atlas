import { EPlayStatus, ETierRank } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonalLibraryGameUpdateDto {
	@Expose()
	gameId?: string;

	@Expose()
	personalLibraryId?: string;

	@Expose()
	status?: EPlayStatus;

	@Expose()
	rank?: ETierRank;

	@Expose()
	note?: string;

	constructor(partial: Partial<PersonalLibraryGameUpdateDto>) {
		Object.assign(this, partial);
	}
}

