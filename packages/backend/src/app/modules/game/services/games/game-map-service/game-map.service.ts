import { CompanyResponseDto } from '../../../dto/response/company/company.dto';
import { CoverResponseDto } from '../../../dto/response/covers/cover.dto';
import { GameDetailsResponseDto } from '../../../dto/response/game/game-details.dto';
import { TGameWithDetails, TPaginateGameDto } from '../../../types/game/game-with-details.type';
import { GenreResponseDto } from '../../../dto/response/genres/genre.dto';
import { Injectable } from '@nestjs/common';
import { KeywordResponseDto } from '../../../dto/response/keywords/keyword.dto';
import { ScreenshotsResponseDto } from '../../../dto/response/screenshots/screenshots.dto';
import { PaginateGameResponseDto } from '../../../dto';

@Injectable()
export class GameMapService {
	toGameDetailsDto(game: TGameWithDetails): GameDetailsResponseDto {
		const coverDto = game.cover ? new CoverResponseDto(
			game.cover.checksum,
			game.cover.gameId,
			game.cover.imageId,
			game.cover.height ?? 0,
			game.cover.width ?? 0,
			game.cover.url,
			game.cover.createdAt,
			game.cover.updatedAt
		) : null;

		const screenshotsDto = game.screenshots.map(screenshot => new ScreenshotsResponseDto(
			screenshot.checksum,
			screenshot.gameId,
			screenshot.imageId,
			screenshot.height,
			screenshot.width,
			screenshot.url,
			screenshot.createdAt,
			screenshot.updatedAt
		));

		const genresDto = game.gameGenres.map(gameGenre => new GenreResponseDto(
			gameGenre.genre.checksum,
			gameGenre.genre.name,
			gameGenre.genre.slug,
			gameGenre.genre.createdAt,
			gameGenre.genre.updatedAt
		));

		const keywordsDto = game.gameKeywords.map(gameKeyword => new KeywordResponseDto(
			gameKeyword.keyword.checksum,
			gameKeyword.keyword.name,
			gameKeyword.keyword.slug,
			gameKeyword.keyword.url,
			gameKeyword.keyword.createdAt,
			gameKeyword.keyword.updatedAt
		));

		const companiesDto = game.gameCompanies.map(gameCompany => ({
			developer: gameCompany.developer,
			publisher: gameCompany.publisher,
			supporting: gameCompany.supporting,
			company: new CompanyResponseDto(
				gameCompany.company.checksum,
				gameCompany.company.name,
				gameCompany.company.slug,
				gameCompany.company.country,
				gameCompany.company.startDate,
				gameCompany.company.createdAt,
				gameCompany.company.updatedAt
			)
		}));

		return new GameDetailsResponseDto(
			game.checksum,
			game.name,
			game.summary,
			game.storyline,
			game.totalRating,
			game.totalRatingCount,
			game.url,
			game.firstReleaseDate,
			coverDto,
			screenshotsDto,
			genresDto,
			keywordsDto,
			companiesDto,
			game.createdAt,
			game.updatedAt
		);
	}

	toPaginateGameDto(game: TPaginateGameDto): PaginateGameResponseDto {
		return new PaginateGameResponseDto({
			checksum: game.checksum,
			name: game.name,
			summary: game.summary,
			storyline: game.storyline,
			totalRating: game.totalRating,
			totalRatingCount: game.totalRatingCount,
			url: game.url,
			firstReleaseDate: game.firstReleaseDate,
			coverUrl: game.cover?.url || null,
			genres: game.gameGenres.map(gameGenre => new GenreResponseDto(
				gameGenre.genre.checksum, gameGenre.genre.name, gameGenre.genre.slug, gameGenre.genre.createdAt, gameGenre.genre.updatedAt
			)),
			createdAt: game.createdAt,
			updatedAt: game.updatedAt,
		});
	}
}
