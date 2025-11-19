import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameResponseDto {
	@Expose()
	checksum: string;

	@Expose()
	name: string;

	@Expose()
	summary?: string;

	@Expose()
	storyline?: string;

	@Expose()
	totalRating?: number;

	@Expose()
	totalRatingCount?: number;

	@Expose()
	url?: string;

	@Expose()
	firstReleaseDate?: Date;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		checksum: string,
		name: string,
		summary: string | null,
		storyline: string | null,
		totalRating: number | null,
		totalRatingCount: number | null,
		url: string | null,
		firstReleaseDate: Date | null,
		createdAt: Date,
		updatedAt: Date
	) {
		this.checksum = checksum;
		this.name = name;
		this.summary = summary || undefined;
		this.storyline = storyline || undefined;
		this.totalRating = totalRating || undefined;
		this.totalRatingCount = totalRatingCount || undefined;
		this.url = url || undefined;
		this.firstReleaseDate = firstReleaseDate || undefined;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

