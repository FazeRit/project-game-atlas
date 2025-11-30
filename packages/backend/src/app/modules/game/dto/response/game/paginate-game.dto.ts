import { Exclude, Expose, Type } from 'class-transformer';
import { GenreResponseDto } from '../genres';
import { GameResponseDto } from './game.dto';
import { CoverResponseDto } from '../covers';

@Exclude()
export class PaginateGameResponseDto extends GameResponseDto {
	@Expose()
	@Type(() => CoverResponseDto)
	cover?: CoverResponseDto;

	@Expose()
	@Type(() => GenreResponseDto)
	genres: Array<GenreResponseDto>;

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
			cover?: CoverResponseDto,
			genres: Array<GenreResponseDto>,
			createdAt: Date,
			updatedAt: Date
		}
	) {
		super(data);
		this.cover = data.cover;
		this.genres = data.genres;
	}
}
