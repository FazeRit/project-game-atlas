import { EPlayStatus, ETierRank } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonalLibraryGameResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	gameId: string;

	@Expose()
	personalLibraryId: string;

	@Expose()
	status: EPlayStatus;

	@Expose()
	rank: ETierRank;

	@Expose()
	note?: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		gameId: string,
		personalLibraryId: string,
		status: EPlayStatus,
		rank: ETierRank,
		createdAt: Date,
		updatedAt: Date,
		note?: string
	) {
		this.checksum = checksum;
		this.gameId = gameId;
		this.personalLibraryId = personalLibraryId;
		this.status = status;
		this.rank = rank;
		this.note = note;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

