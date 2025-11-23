import { EPlayStatus, ETierRank } from '@prisma/client';
import { GameReadService } from '../../../game/services/games/game-read-service/game-read.service';
import { Injectable } from '@nestjs/common';
import { MathCoreService } from '../math-core/math-core.service';
import { UserReadService } from '../../../auth/services/user/user-read-service/user-read.service';
import { UserUpdateDto } from '../../../auth/dto';
import { UserWriteService } from '../../../auth/services/user/user-write-service/user-write.service';

@Injectable()
export class HeuristicEngineService {
	constructor(
		private readonly userReadService: UserReadService,
		private readonly userWriteService: UserWriteService,
		private readonly gameReadService: GameReadService,
		private readonly mathCoreService: MathCoreService
	) {}

	async processStatusUpdate(
        userId: string,
        gameId: string,
        newStatus: EPlayStatus,
        oldStatus?: EPlayStatus
    ): Promise<void> {
		const newStatusWeight = this.getStatusWeight(newStatus);
		const oldStatusWeight = oldStatus ? this.getStatusWeight(oldStatus) : 0

		const delta = newStatusWeight - oldStatusWeight;

		if(delta !== 0) {
			this.applyWeightDelta(userId, gameId, delta);
		}
	}

	async processRankUpdate(
        userId: string,
        gameId: string,
        newRank: ETierRank,
        oldRank?: ETierRank
    ): Promise<void> {
		const newRankWeight = this.getRankWeight(newRank);
		const oldRankWeight = oldRank ? this.getRankWeight(oldRank) : 0

		const delta = newRankWeight - oldRankWeight;

		if(delta !== 0) {
			this.applyWeightDelta(userId, gameId, delta);
		}
	}

	private getStatusWeight(status: EPlayStatus): number {
        switch (status) {
            case EPlayStatus.PREFERENCE: return 25;
            case EPlayStatus.COMPLETED: return 15;
            case EPlayStatus.PLAYING: return 10;
            case EPlayStatus.BACKLOG: return 5;
            case EPlayStatus.DROPPED: return -15;
            case EPlayStatus.ON_HOLD: return 0;
            default: return 0;
        }
    }

    private getRankWeight(rank: ETierRank): number {
        switch (rank) {
            case ETierRank.S: return 20;
            case ETierRank.A: return 15;
            case ETierRank.B: return 10;
            case ETierRank.C: return 5;
            case ETierRank.D: return -5;
            case ETierRank.F: return -20;
            case ETierRank.UNRANKED: return 0;
            default: return 0;
        }
    }

	private async applyWeightDelta(
		userId: string,
		gameId: string,
		weightDelta: number
	): Promise<void> {
		const userVector = await this.userReadService.getTasteProfile(userId);

		const gameVector = await this.gameReadService.getGameVector(gameId);

		const impactVector: Record<string, number> = {};

		for(const key in gameVector) {
			if(gameVector[key] > 0) {
				impactVector[key] = weightDelta;
			}
		}

		const updatedVector = this.mathCoreService.mergeVector(userVector, impactVector);

		const updatedUserDto = new UserUpdateDto({
			tasteVector: updatedVector
		})

		await this.userWriteService.update(userId, updatedUserDto)
	}
}