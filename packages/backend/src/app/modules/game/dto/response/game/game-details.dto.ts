import { CompanyResponseDto } from '../company/company.dto';
import { CoverResponseDto } from '../covers/cover.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { GenreResponseDto } from '../genres/genre.dto';
import { KeywordResponseDto } from '../keywords/keyword.dto';
import { ScreenshotsResponseDto } from '../screenshots/screenshots.dto';

@Exclude()
export class GameDetailsResponseDto {
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
	@Type(() => CoverResponseDto)
	cover?: CoverResponseDto;

	@Expose()
	@Type(() => ScreenshotsResponseDto)
	screenshots: Array<ScreenshotsResponseDto>;

	@Expose()
	@Type(() => GenreResponseDto)
	genres: Array<GenreResponseDto>;

	@Expose()
	@Type(() => KeywordResponseDto)
	keywords: Array<KeywordResponseDto>;

	@Expose()
	companies: Array<{
		developer: boolean;
		publisher: boolean;
		supporting: boolean;
		company: CompanyResponseDto;
	}>;

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
		cover: CoverResponseDto | null,
		screenshots: Array<ScreenshotsResponseDto>,
		genres: Array<GenreResponseDto>,
		keywords: Array<KeywordResponseDto>,
		companies: Array<{
			developer: boolean;
			publisher: boolean;
			supporting: boolean;
			company: CompanyResponseDto;
		}>,
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
		this.cover = cover || undefined;
		this.screenshots = screenshots;
		this.genres = genres;
		this.keywords = keywords;
		this.companies = companies;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

