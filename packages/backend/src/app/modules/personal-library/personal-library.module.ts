import { AnalyticsModule } from '../analytics/analytics.module';
import { GameModule } from '../game/game.module';
import { Module, forwardRef } from '@nestjs/common';
import { PERSONAL_LIBRARY_GAME_PROVIDERS, PERSONAL_LIBRARY_PROVIDERS } from './providers';
import { PersonalLibraryGameReadController } from './controllers/personal-library-game/personal-library-game-read-controller/personal-library-game-read.controller';
import { PersonalLibraryGameReadService } from './services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service';
import { PersonalLibraryGameWriteController } from './controllers/personal-library-game/personal-library-game-write-controller/personal-library-game-write.controller';
import { PersonalLibraryGameWriteService } from './services/personal-library-game/personal-library-game-write-service/personal-library-game-write.service';
import { PersonalLibraryReadController } from './controllers/personal-library/personal-library-read-controller/personal-library-read.controller';
import { PersonalLibraryReadService } from './services/personal-library/personal-library-read-service/personal-library-read.service';
import { PersonalLibraryWriteController } from './controllers/personal-library/personal-library-write-controller/personal-library-write.controller';
import { PersonalLibraryWriteService } from './services/personal-library/personal-library-write-service/personal-library-write.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [
		PrismaModule,
		GameModule,
		forwardRef(() => AnalyticsModule),
	],
	controllers: [
		PersonalLibraryReadController,
		PersonalLibraryWriteController,
		PersonalLibraryGameReadController,
		PersonalLibraryGameWriteController,
	],
	providers: [
		PersonalLibraryReadService,
		PersonalLibraryWriteService,
		PersonalLibraryGameReadService,
		PersonalLibraryGameWriteService,
		...PERSONAL_LIBRARY_PROVIDERS,
		...PERSONAL_LIBRARY_GAME_PROVIDERS,
	],
	exports: [
		PersonalLibraryReadService,
		PersonalLibraryWriteService,
		PersonalLibraryGameReadService,
		PersonalLibraryGameWriteService,
	]
})
export class PersonalLibraryModule {}

