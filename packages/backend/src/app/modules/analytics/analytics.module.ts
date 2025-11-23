import { AuthModule } from '../auth/auth.module';
import { GameModule } from '../game/game.module';
import { AnalyticsReadController } from './controllers/analytics-read-controller/analytics-read.controller';
import { HeuristicEngineService } from './services/heuristic-engine-service/heuristic-engine.service';
import { MathCoreService } from './services/math-core/math-core.service';
import { Module } from '@nestjs/common';
import { RecommendationCuratorService } from './services/recommendation-curator/recommendation-curator.service';

@Module({
	imports: [
		AuthModule,
		GameModule,
	],
	controllers: [
		AnalyticsReadController,
	],
	providers: [
		MathCoreService,
		HeuristicEngineService,
		RecommendationCuratorService,
	],
	exports: [
		MathCoreService,
		HeuristicEngineService,
	]
})
export class AnalyticsModule {}
