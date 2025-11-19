import { Exclude, Expose } from 'class-transformer';
import { PlayStatus, TierRank } from '@prisma/client';

@Exclude()
export class PersonalLibraryGameUpdateDto {
	@Expose()
	gameId?: string;

	@Expose()
	personalLibraryId?: string;

	@Expose()
	status?: PlayStatus;

	@Expose()
	rank?: TierRank;

	@Expose()
	note?: string;

	constructor(partial: Partial<PersonalLibraryGameUpdateDto>) {
		Object.assign(this, partial);
	}
}

