import { Exclude, Expose, Type } from 'class-transformer';
import { GenreResponseDto } from '../genres';

@Exclude()
export class PaginateGameResponseDto {
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
	coverUrl?: string;

	@Expose()
	@Type(() => GenreResponseDto)
	genres: Array<GenreResponseDto>;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	constructor(
		data: {
			checksum: string,
			name: string,
			summary: string | null,
			storyline: string | null,
			totalRating: number | null,
			totalRatingCount: number | null,
			url: string | null,
			firstReleaseDate: Date | null,
			coverUrl: string | null,
			genres: Array<GenreResponseDto>,
			createdAt: Date,
			updatedAt: Date
		}
	) {
		this.checksum = data.checksum;
		this.name = data.name;
		this.summary = data.summary || undefined;
		this.storyline = data.storyline || undefined;
		this.totalRating = data.totalRating || undefined;
		this.totalRatingCount = data.totalRatingCount || undefined;
		this.url = data.url || undefined;
		this.firstReleaseDate = data.firstReleaseDate || undefined;
		this.coverUrl = data.coverUrl || undefined;
		this.genres = data.genres;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}

