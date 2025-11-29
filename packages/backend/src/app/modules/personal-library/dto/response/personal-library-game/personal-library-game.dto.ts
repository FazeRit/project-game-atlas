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
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	@Expose()
	note?: string;

	constructor(
		data: {
            checksum: string,
            gameId: string,
            personalLibraryId: string,
            status: EPlayStatus,
            rank: ETierRank,
            createdAt: Date,
            updatedAt: Date,
            note?: string
        }
	) {
		this.checksum = data.checksum;
		this.gameId = data.gameId;
		this.personalLibraryId = data.personalLibraryId;
		this.status = data.status;
		this.rank = data.rank;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
		this.note = data.note ?? undefined;
	}
}
