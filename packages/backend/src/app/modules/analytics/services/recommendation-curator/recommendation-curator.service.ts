import { EPlayStatus, EPredictionVerdict, ERecommendationReason } from "@prisma/client";
import { UserReadService } from "../../../auth/services/user/user-read-service/user-read.service";
import { GameReadService } from "../../../game/services/games/game-read-service/game-read.service";
import { MathCoreService } from "../math-core/math-core.service";
import { Injectable } from "@nestjs/common";
import { RecommandationCandidateResponseDto } from "../../dto/response/recommandation/recommendation-candidate.dto";
import { RecommendationItemResponseDto } from "../../dto/response/recommandation/recommandation-item.dto";
import { PersonalLibraryGameReadService } from "../../../personal-library/services/personal-library-game/personal-library-game-read-service/personal-library-game-read.service";
import { PersonalLibraryGameFiltersDto } from "../../../personal-library/dto/request/personal-library-game/personal-library-game-filters.dto";
import { BacklogCandidates, PredictionResponseDto, PredictionFlagsResponseDto } from "../../dto";

@Injectable()
export class RecommendationCuratorService {
    constructor(
        private readonly userReadService: UserReadService,
        private readonly gameReadService: GameReadService,
        private readonly mathCoreService: MathCoreService,
        private readonly personalLibraryGameReadService: PersonalLibraryGameReadService
    ) { }

    async getRecommandations(userId: string): Promise<Array<RecommendationItemResponseDto>> {
        const userVector = await this.userReadService.getTasteProfile(userId);

        if (Object.keys(userVector).length === 0) {
            return [];
        }

        const backlogCandidates = await this.getBacklogCandidates(userId);
        const explorationCandidates = await this.getExplorationCandidates(userId);
        
        if (backlogCandidates.length === 0 && explorationCandidates.length === 0) {
            return [];
        }

        const lastGameId = await this.personalLibraryGameReadService.findLastSignificantGameId(userId);

        const [antiBurnoutItems, blindSpotItems, affinityItems] = await Promise.all([
            this.runAntiBurnout(lastGameId, backlogCandidates),
            this.runBlindSpot(userVector, explorationCandidates),
            this.runGeneralAffinity(userVector, explorationCandidates)
        ]);
        
        const rawItems = [
            ...antiBurnoutItems,
            ...blindSpotItems,
            ...affinityItems
        ];

        const uniqueItems = this.deduplicate(rawItems);

        const response = await Promise.all(uniqueItems.map(async (item) => {
            const recommendationItem = new RecommendationItemResponseDto({
                gameId: item.gameId,
                reason: item.reason,
                score: Math.round(item.score * 100),
                description: item.description
            });
            return recommendationItem;
        }));

        return response;
    }

    private async getBacklogCandidates(userId: string): Promise<Array<BacklogCandidates>> {
        const filters = new PersonalLibraryGameFiltersDto({
            status: [EPlayStatus.BACKLOG]
        });

        const data = await this.personalLibraryGameReadService.findAll(
            userId,
            1,
            1000,
            filters,
        );

        const candidates: Array<BacklogCandidates | null> = await Promise.all(
            data.data.map(async item => {
                const vector = await this.gameReadService.getGameVector(item.game.checksum);

                return new BacklogCandidates({
                    checksum: item.game.checksum,
                    tasteVector: vector
                });
            })
        );

        const filteredCandidates = candidates.filter((c: BacklogCandidates | null): c is BacklogCandidates => c !== null);
        return filteredCandidates;
    }

    private async getExplorationCandidates(userId: string): Promise<Array<BacklogCandidates>> {
        const candidatesIds = await this.personalLibraryGameReadService.findExplorationCandidates(
            userId,
            5000 
        );

        const candidates: Array<BacklogCandidates | null> = await Promise.all(
            candidatesIds.map(async (checksum) => {
                const vector = await this.gameReadService.getGameVector(checksum);
                return new BacklogCandidates({
                    checksum: checksum,
                    tasteVector: vector
                });
            })
        );

        const filteredCandidates = candidates.filter((c: BacklogCandidates | null): c is BacklogCandidates => c !== null);
        return filteredCandidates;
    }

    private async runAntiBurnout(
        lastGameId: string | null,
        candidates: Array<BacklogCandidates>
    ): Promise<Array<RecommandationCandidateResponseDto>> {
        if (!lastGameId || candidates.length === 0) {
            return [];
        }

        const lastGameVector = await this.gameReadService.getGameVector(lastGameId);

        const scoredCandidates = candidates.map(candidate => {
            const similarity = this.mathCoreService.calculateSimilarity(lastGameVector, candidate.tasteVector);
            return {
                ...candidate,
                score: similarity
            };
        });

        scoredCandidates.sort((a, b) => a.score - b.score);

        const top1 = scoredCandidates.slice(0, 1);
        
        return top1.map(match => new RecommandationCandidateResponseDto({
            gameId: match.checksum,
            score: match.score,
            reason: ERecommendationReason.ANTI_BURNOUT,
            description: "Відпочинок: гра, кардинально відмінна від попередньої."
        }));
    }

    private async runBlindSpot(
        userVector: Record<string, number>,
        candidates: Array<BacklogCandidates>
    ): Promise<Array<RecommandationCandidateResponseDto>> {
        
        if (candidates.length === 0) {
            return [];
        }
        
        const scoredCandidates = candidates.map(candidate => {
            const similarity = this.mathCoreService.calculateSimilarity(userVector, candidate.tasteVector);
            return { ...candidate, score: similarity };
        });

        const BLIND_SPOT_MIN_SCORE = 0.35;
        const BLIND_SPOT_MAX_SCORE = 0.65;

        const blindSpotCandidates = scoredCandidates
            .filter(c => c.score >= BLIND_SPOT_MIN_SCORE && c.score < BLIND_SPOT_MAX_SCORE);

        blindSpotCandidates.sort((a, b) => b.score - a.score);

        const top1BlindSpot = blindSpotCandidates.slice(0, 1);

        return top1BlindSpot.map(match => new RecommandationCandidateResponseDto({
            gameId: match.checksum,
            score: match.score,
            reason: ERecommendationReason.BLIND_SPOT,
            description: "Сліпа Пляма: абсолютно нова гра, яка розширює Ваш смак."
        }));
    }

    private async runGeneralAffinity(
        userVector: Record<string, number>,
        candidates: Array<BacklogCandidates>
    ): Promise<Array<RecommandationCandidateResponseDto>> {
        if (candidates.length === 0) {
            return [];
        }

        const scoredCandidates = candidates.map(candidate => {
            const similarity = this.mathCoreService.calculateSimilarity(userVector, candidate.tasteVector);
            return { ...candidate, score: similarity };
        });

        const AFFINITY_MIN_SCORE = 0.75;

        const affinityCandidates = scoredCandidates
            .filter(c => c.score >= AFFINITY_MIN_SCORE);
        
        affinityCandidates.sort((a, b) => b.score - a.score);

        const top2Affinity = affinityCandidates.slice(0, 2);

        return top2Affinity.map(match => new RecommandationCandidateResponseDto({
            gameId: match.checksum,
            score: match.score,
            reason: ERecommendationReason.HIGH_COMPATIBILITY,
            description: "Спорідненість: гра, яка максимально відповідає Вашим улюбленим жанрам."
        }));
    }
    
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
    ): Promise<PredictionFlagsResponseDto> {
        const greenFlags: Array<string> = [];
        const redFlags: Array<string> = [];

        for (const key in gameVector) {
            if (gameVector[key] > 0) {
                const userInterest = userVector[key] || 0;

                if (userInterest >= 15) {
                    greenFlags.push(key);
                }

                if (userInterest <= -10) {
                    redFlags.push(key);
                }
            }
        }

        const response = new PredictionFlagsResponseDto({
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

    private deduplicate(items: Array<RecommandationCandidateResponseDto>): Array<RecommandationCandidateResponseDto> {
        const unique = new Map();
        items.forEach(item => {
            if (!unique.has(item.gameId)) unique.set(item.gameId, item);
        });

        const uniqueValues = Array.from(unique.values());
        return uniqueValues;
    }
}