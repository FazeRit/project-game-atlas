import { ERecommandationReason } from "../enums";

export interface IRecommandationsResponse {
    gameId: string;
    reason: ERecommandationReason;
    score: number;
    description: string;

}