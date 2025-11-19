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
import { ICompanyReadRepository } from './repositories/companies/company/abstracts/icompany-read.repository';
import { ICompanyWriteRepository } from './repositories/companies/company/abstracts';
import { ICoverWriteRepository } from './repositories/covers/abstracts/icover-write.repository';
import { IGameCompanyWriteRepository } from './repositories/companies/game-company/abstracts';
import { IGameGenreWriteRepository } from './repositories/genres/game-genres/abstracts';
import { IGameKeywordWriteRepository } from './repositories/keywords/game-keywords/abstracts/igame-keyword-write.repository';
import { IGameReadRepository } from './repositories/game/abstracts/igame-read.repository';
import { IGameWriteRepository } from './repositories/game/abstracts/igame-write.repository';
import { IGenreReadRepository } from './repositories/genres/genres/abstracts/igenre-read.repository';
import { IGenreWriteRepository } from './repositories/genres/genres/abstracts/igenre-write.repository';
import { IKeywordReadRepository } from './repositories/keywords/keywords/abstracts/ikeyword-read.repository';
import { IKeywordWriteRepository } from './repositories/keywords/keywords/abstracts/ikeyword-write.repository';
import { IPlatformTypeWriteRepository } from './repositories/platforms/platform-type/abstracts';
import { IPlatformWriteRepository } from './repositories/platforms/platform/abstracts';
import { IScreenshotsWriteRepository } from './repositories/screenshots/abstracts/iscreenshots-write.repository';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

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
		IPlatformTypeWriteRepository,
		IPlatformWriteRepository,
		ICompanyReadRepository,
		ICompanyWriteRepository,
		IGenreReadRepository,
		IGenreWriteRepository,
		IKeywordReadRepository,
		IKeywordWriteRepository,
		ICoverWriteRepository,
		IScreenshotsWriteRepository,
		IGameCompanyWriteRepository,
		IGameGenreWriteRepository,
		IGameKeywordWriteRepository,
		IGameReadRepository,
		IGameWriteRepository,
	],
})

export class GameModule {}