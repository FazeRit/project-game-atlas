import { EPredictionVerdict } from "@prisma/client";
import { UserReadService } from "../../../auth/services/user/user-read-service/user-read.service";
import { GameReadService } from "../../../game/services/games/game-read-service/game-read.service";
import { MathCoreService } from "../math-core/math-core.service";
import { PredictionResponseDto, PredictionFlagsDto } from "../../dto/response";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RecommendationCuratorService {
	constructor(
		private readonly userReadService: UserReadService,
		private readonly gameReadService: GameReadService,
		private readonly mathCoreService: MathCoreService,
	) {}

	async predictCompatibility(
		userId: string,
		gameId: string
	): Promise<PredictionResponseDto> {
		const userVector = await this.userReadService.getTasteProfile(userId);

		const gameVector = await this.gameReadService.getGameVector(gameId);

		const score = this.mathCoreService.calculateSimilarity(userVector, gameVector)

		const {
			greenFlags,
			redFlags
		} = await this.analyzeGap(userVector, gameVector);

		const percentageScore = Math.max(0, Math.round(score * 100));

		const verdict = this.getCompatibilityVerdict(
			score,
			redFlags.length
		);

		const response = new PredictionResponseDto({
			gameId,
			compabilityScore: percentageScore,
			verdict,
			greenFlags: greenFlags,
			redFlags: redFlags,
		});

		return response;
	}

	private async analyzeGap(
		userVector: Record<string, number>,
		gameVector: Record<string, number>
	): Promise<PredictionFlagsDto> {
		const greenFlags: Array<string> = [];
		const redFlags: Array<string> = [];

		for (const key in gameVector) {
            if (gameVector[key] > 0) {
                const userInterest = userVector[key] || 0;

                if (userInterest >= 10) {
                    greenFlags.push(key);
                }

                if (userInterest <= -5) {
                    redFlags.push(key);
                }
            }
        }

		const response = new PredictionFlagsDto({
			greenFlags,
			redFlags,
		});

		return response;
	}

	private getCompatibilityVerdict(
		score: number,
		redFlagsCount: number
	): EPredictionVerdict {
        if (redFlagsCount >= 3) {
            return EPredictionVerdict.RISKY;
        }

        if (score >= 0.7) {
            return EPredictionVerdict.EXCELLENT;
        } else if (score >= 0.4) {
            return EPredictionVerdict.GOOD;
        } else {
            return EPredictionVerdict.RISKY;
        }
    }
}