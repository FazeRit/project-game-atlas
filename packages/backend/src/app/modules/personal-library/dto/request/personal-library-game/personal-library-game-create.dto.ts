import { Exclude, Expose } from 'class-transformer';
import { PlayStatus, TierRank } from '@prisma/client';

@Exclude()
export class PersonalLibraryGameCreateDto {
	@Expose()
	gameId: string;

	@Expose()
	personalLibraryId: string;

	@Expose()
	status?: PlayStatus;

	@Expose()
	rank?: TierRank;

	@Expose()
	note?: string;

	constructor(data: {
		gameId: string;
		personalLibraryId: string;
		status?: PlayStatus;
		rank?: TierRank;
		note?: string;
	}) {
		this.gameId = data.gameId;
		this.personalLibraryId = data.personalLibraryId;
		this.status = data.status;
		this.rank = data.rank;
		this.note = data.note;
	}
}

