import { CompaniesSeeder } from './seeders/companies/companies.seeder';
import { CoversSeeder } from './seeders/covers/covers.seeder';
import { EnvModule } from '../../config/env/env.module';
import { GameCompaniesSeeder } from './seeders/companies/game-companies.seeder';
import { GameGenresSeeder } from './seeders/genres/game-genres.seeder';
import { GameKeywordsSeeder } from './seeders/keywords/game-keywords.seeder';
import { GamePlatformsSeeder } from './seeders/platforms/game-platforms.seeder';
import { GameModule } from '../game/game.module';
import { GamesSeeder } from './seeders/games/games.seeder';
import { GenresSeeder } from './seeders/genres/genres.seeder';
import { KeywordsSeeder } from './seeders/keywords/keywords.seeder';
import { Module } from '@nestjs/common';
import { PlatformsSeeder } from './seeders/platforms/platforms.seeder';
import { PlatformTypesSeeder } from './seeders/platforms/platform-types.seeder';
import { ScreenshotsSeeder } from './seeders/screenshots/screenshots.seeder';

@Module({
	imports: [
		GameModule,
		EnvModule,
	],
	providers: [
		PlatformTypesSeeder,
		PlatformsSeeder,
		CompaniesSeeder,
		GenresSeeder,
		KeywordsSeeder,
		CoversSeeder,
		ScreenshotsSeeder,
		GameCompaniesSeeder,
		GameGenresSeeder,
		GameKeywordsSeeder,
		GamePlatformsSeeder,
		GamesSeeder,
	],
	exports: [
		PlatformTypesSeeder,
		PlatformsSeeder,
		CompaniesSeeder,
		GenresSeeder,
		KeywordsSeeder,
		CoversSeeder,
		ScreenshotsSeeder,
		GameCompaniesSeeder,
		GameGenresSeeder,
		GameKeywordsSeeder,
		GamePlatformsSeeder,
		GamesSeeder,
	],
})

export class SeedingModule {}