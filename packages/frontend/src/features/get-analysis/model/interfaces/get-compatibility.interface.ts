import { ECompatibilityVerdict } from "../enums";

export interface IGetCompatibilityResponse {
    gameId: string;
    compatibilityScore: number;
    verdict: ECompatibilityVerdict;
    greenFlags: Array<string>;
    redFlags: Array<string>;
}