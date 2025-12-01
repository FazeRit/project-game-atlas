import { CompanyResponseDto } from '../company/company.dto';
import { CoverResponseDto } from '../covers/cover.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { GenreResponseDto } from '../genres/genre.dto';
import { KeywordResponseDto } from '../keywords/keyword.dto';
import { ScreenshotsResponseDto } from '../screenshots/screenshots.dto';
import { GameResponseDto } from './game.dto';

@Exclude()
export class GameDetailsResponseDto extends GameResponseDto {
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
		}
	) {
		super(data);
		this.cover = data.cover ?? undefined;
		this.screenshots = data.screenshots;
		this.genres = data.genres;
		this.keywords = data.keywords;
		this.companies = data.companies;
	}
}
