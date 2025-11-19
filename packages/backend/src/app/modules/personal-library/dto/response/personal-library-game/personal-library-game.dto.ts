import { Exclude, Expose } from 'class-transformer';
import { PlayStatus, TierRank } from '@prisma/client';

@Exclude()
export class PersonalLibraryGameResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	gameId: string;

	@Expose()
	personalLibraryId: string;

	@Expose()
	status: PlayStatus;

	@Expose()
	rank: TierRank;

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
		status: PlayStatus,
		rank: TierRank,
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

