import {
	COMPANIES_PROVIDERS,
	COVERS_PROVIDERS,
	GAME_COMPANY_PROVIDERS,
	GAME_GENRE_PROVIDERS,
	GAME_KEYWORD_PROVIDERS,
	GAME_PROVIDERS,
	GENRES_PROVIDERS,
	KEYWORDS_PROVIDERS,
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
import { GameMapService } from './services/games/game-map-service/game-map.service';
import { GameReadController } from './controllers/games/game-read-controller/game-read.controller';
import { GameReadService } from './services/games/game-read-service/game-read.service';
import { GameWriteService } from './services/games/game-write-service/game-write.service';
import { GenreReadService } from './services/genres/genres/genres-read-service/genre-read.service';
import { GenreWriteService } from './services/genres/genres/genres-write-service/genre-write.service';
import { KeywordsWriteService } from './services/keywords/keywords/keywords-write-service/keywords-write.service';
import { Module } from '@nestjs/common';
import { ScreenshotsReadService } from './services/screenshots/screenshots-read-service/screenshots-read.service';
import { ScreenshotsWriteService } from './services/screenshots/screenshots-write-service/screenshots-write.service';
import { GenreReadController } from './controllers/genres/genres-read-controller/genres-read.controller';
import { KeywordsReadService } from './services/keywords/keywords/keywords-read-service/keywords-read.service';
import { KeywordsReadController } from './controllers/keywords/keywords-read-controller/keywords-read.controller';
import { GAME_BATTLE_PROVIDERS } from './providers/game-battles';
import { GAME_BATTLE_VOTE_PROVIDERS } from './providers/game-battle-votes';
import { GameBattleVotesReadController } from './controllers/game-battle-votes/game-battle-votes-read-controller/game-battle-votes-read.controller';
import { GameBattlesReadController } from './controllers/game-battles/game-battles-read-controller/game-battles-read.controller';
import { GameBattleVotesWriteController } from './controllers/game-battle-votes/game-battle-votes-write-controller/game-battle-votes-write.controller';
import { GameBattlesGateways } from './gateways/game-battles/game-battles.gateways';

@Module({
	imports: [],
	controllers: [
		GenreReadController,
		GameReadController,
		KeywordsReadController,
		GameBattleVotesReadController,
		GameBattleVotesWriteController,
		GameBattlesReadController
	],
	providers: [
		...COMPANIES_PROVIDERS,
		...GENRES_PROVIDERS,
		...KEYWORDS_PROVIDERS,
		...COVERS_PROVIDERS,
		...SCREENSHOTS_PROVIDERS,
		...GAME_COMPANY_PROVIDERS,
		...GAME_GENRE_PROVIDERS,
		...GAME_KEYWORD_PROVIDERS,
		...GAME_PROVIDERS,
		...GAME_BATTLE_PROVIDERS,
		...GAME_BATTLE_VOTE_PROVIDERS
	],
	exports: [
		CompanyReadService,
		CompanyWriteService,
		GenreReadService,
		GenreWriteService,
		KeywordsReadService,
		KeywordsWriteService,
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
		GameMapService,
		GameBattlesGateways
	],
})

export class GameModule { }