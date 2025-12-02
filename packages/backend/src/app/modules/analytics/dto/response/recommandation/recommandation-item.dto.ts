import { ERecommendationReason } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RecommendationItemResponseDto {
    @Expose()
    gameId: string;

    @Expose()
    reason: ERecommendationReason;

    @Expose()
    score: number;

    @Expose()
    description: string;

    constructor(data: {
        gameId: string;
        reason: ERecommendationReason;
        score: number;
        description: string;
    }) {
        this.gameId = data.gameId;
        this.reason = data.reason;
        this.score = data.score;
        this.description = data.description;
    }
}