import { ERecommendationReason } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RecommandationCandidateResponseDto {
    @Expose()
    gameId: string;

    @Expose()
    score: number;

    @Expose()
    reason: ERecommendationReason;

    @Expose()
    description: string;

    constructor(data: {
        gameId: string;
        score: number;
        reason: ERecommendationReason;
        description: string;
    }) {
        this.gameId = data.gameId;
        this.score = data.score;
        this.reason = data.reason;
        this.description = data.description;
    }
}