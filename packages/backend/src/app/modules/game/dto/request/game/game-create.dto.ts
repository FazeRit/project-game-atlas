import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameCreateDto {
	@Expose()
	checksum?: string;

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

	constructor(data: {
		checksum?: string;
		name: string;
		summary?: string;
		storyline?: string;
		totalRating?: number;
		totalRatingCount?: number;
		url?: string;
		firstReleaseDate?: Date;
	}) {
		this.checksum = data.checksum;
		this.name = data.name;
		this.summary = data.summary;
		this.storyline = data.storyline;
		this.totalRating = data.totalRating;
		this.totalRatingCount = data.totalRatingCount;
		this.url = data.url;
		this.firstReleaseDate = data.firstReleaseDate;
	}
}

