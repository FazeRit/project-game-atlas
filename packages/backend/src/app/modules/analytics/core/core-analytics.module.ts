import { Module } from '@nestjs/common';
import { AuthModule } from '../../../auth/auth.module';
import { GameModule } from '../../../game/game.module';
import { HeuristicEngineService } from './services/heuristic-engine/heuristic-engine.service';
import { MathCoreService } from './services/math-core/math-core.service';

@Module({
    imports: [AuthModule, GameModule],
    providers: [MathCoreService, HeuristicEngineService],
    exports: [MathCoreService, HeuristicEngineService],
})
export class CoreAnalyticsModule {}