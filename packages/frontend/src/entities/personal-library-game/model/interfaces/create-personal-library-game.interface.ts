import { EPersonalLibraryGameRank, EPersonalLibraryGameStatus } from "../enums";

export interface ICreatePersonalLibraryGameRequest {
    gameId: string;
    status: EPersonalLibraryGameStatus;
    rank: EPersonalLibraryGameRank;
    note?: string;
}