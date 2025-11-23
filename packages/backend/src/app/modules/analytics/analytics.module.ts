import { AuthModule } from '../auth/auth.module';
import { GameModule } from '../game/game.module';
import { HeuristicEngineService } from './services/heuristic-engine-service/heuristic-engine.service';
import { MathCoreService } from './services/math-core/math-core.service';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		AuthModule,
		GameModule,
	],
	controllers: [],
	providers: [
		MathCoreService,
		HeuristicEngineService,
	],
	exports: [
		MathCoreService,
		HeuristicEngineService,
	]
})
export class AnalyticsModule {}
