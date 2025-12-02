import { ERecommendationReason } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RecommendationItemResponseDto {
    @Expose()
    gameId: string;

    @Expose()
    title: string; 

    @Expose()
    coverUrl?: string;

    @Expose()
    reason: ERecommendationReason;

    @Expose()
    score: number;

    @Expose()
    description: string;

    constructor(data: {
        gameId: string;
        title: string;
        coverUrl?: string;
        reason: ERecommendationReason;
        score: number;
        description: string;
    }) {
        this.gameId = data.gameId;
        this.title = data.title;
        this.coverUrl = data.coverUrl;
        this.reason = data.reason;
        this.score = data.score;
        this.description = data.description;
    }
}