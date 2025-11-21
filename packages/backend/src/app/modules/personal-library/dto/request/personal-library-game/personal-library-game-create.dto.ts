import { EPlayStatus, ETierRank } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonalLibraryGameCreateDto {
	@Expose()
	gameId: string;

	@Expose()
	personalLibraryId: string;

	@Expose()
	status?: EPlayStatus;

	@Expose()
	rank?: ETierRank;

	@Expose()
	note?: string;

	constructor(data: {
		gameId: string;
		personalLibraryId: string;
		status?: EPlayStatus;
		rank?: ETierRank;
		note?: string;
	}) {
		this.gameId = data.gameId;
		this.personalLibraryId = data.personalLibraryId;
		this.status = data.status;
		this.rank = data.rank;
		this.note = data.note;
	}
}

