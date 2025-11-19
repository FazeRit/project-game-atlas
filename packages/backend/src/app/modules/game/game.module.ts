import {
    COMPANIES_PROVIDERS,
    COVERS_PROVIDERS,
    GAME_COMPANY_PROVIDERS,
    GAME_GENRE_PROVIDERS,
    GAME_KEYWORD_PROVIDERS,
    GAME_PROVIDERS,
    GENRES_PROVIDERS,
    KEYWORDS_PROVIDERS,
    PLATFORM_PROVIDERS,
    PLATFORM_TYPES_PROVIDERS,
    SCREENSHOTS_PROVIDERS
} from './providers';
import { CompanyReadService } from './services/companies/company/company-read-service/company-read.service';
import { CompanyWriteService } from './services/companies/company/company-write-service/company-write.service';
import { CoversReadService } from './services/covers/covers-read-service/covers-read.service';
import { CoversWriteService } from './services/covers/covers-write-service/covers-write.service';
import { GameCompanyReadService } from './services/companies/game-company/game-company-read-service/game-company-read.service';
import { GameCompanyWriteService } from './services/companies/game-company/game-company-write-service/game-company-write.service';
import { GameGenresReadService } from './services/genres/game-genres/game-genres-read-service/game-genres-read.service';
import { GameGenresWriteService } from './services/genres/game-genres/game-genres-write-service/game-genres-write.service';
import { GameKeywordsReadService } from './services/keywords/game-keywords/game-keywords-read-service/game-keywords-read.service';
import { GameKeywordsWriteService } from './services/keywords/game-keywords/game-keywords-write-service/game-keywords-write.service';
import { GameReadService } from './services/game/game-read-service/game-read.service';
import { GameWriteService } from './services/game/game-write-service/game-write.service';
import { GenreReadService } from './services/genres/genres/genres-read-service/genre-read.service';
import { GenreWriteService } from './services/genres/genres/genres-write-service/genre-write.service';
import { KeywordReadService } from './services/keywords/keywords/keywords-read-service/keyword-read.service';
import { KeywordWriteService } from './services/keywords/keywords/keywords-write-service/keyword-write.service';
import { Module } from '@nestjs/common';
import { PlatformReadService } from './services/platforms/platform/platform-read-service/platform-read.service';
import { PlatformTypeReadService } from './services/platforms/platform-type/platform-type-read-service/platform-type-read.service';
import { PlatformTypeWriteService } from './services/platforms/platform-type/platform-type-write-service/platform-type-write.service';
import { PlatformWriteService } from './services/platforms/platform/platform-write-service/platform-write.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ScreenshotsReadService } from './services/screenshots/screenshots-read-service/screenshots-read.service';
import { ScreenshotsWriteService } from './services/screenshots/screenshots-write-service/screenshots-write.service';

@Module({
	imports: [
		PrismaModule,
	],
	providers: [
		...PLATFORM_TYPES_PROVIDERS,
		...PLATFORM_PROVIDERS,
		...COMPANIES_PROVIDERS,
		...GENRES_PROVIDERS,
		...KEYWORDS_PROVIDERS,
		...COVERS_PROVIDERS,
		...SCREENSHOTS_PROVIDERS,
		...GAME_COMPANY_PROVIDERS,
		...GAME_GENRE_PROVIDERS,
		...GAME_KEYWORD_PROVIDERS,
		...GAME_PROVIDERS,
	],
	exports: [
		PlatformTypeReadService,
		PlatformTypeWriteService,
		PlatformReadService,
		PlatformWriteService,
		CompanyReadService,
		CompanyWriteService,
		GenreReadService,
		GenreWriteService,
		KeywordReadService,
		KeywordWriteService,
		CoversReadService,
		CoversWriteService,
		ScreenshotsReadService,
		ScreenshotsWriteService,
		GameCompanyReadService,
		GameCompanyWriteService,
		GameGenresReadService,
		GameGenresWriteService,
		GameKeywordsReadService,
		GameKeywordsWriteService,
		GameReadService,
		GameWriteService,
	],
})

export class GameModule {}