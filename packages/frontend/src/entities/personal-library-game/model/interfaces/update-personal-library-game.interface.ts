import { EPersonalLibraryGameRank, EPersonalLibraryGameStatus } from "../enums";

export interface IUpdatePersonalLibraryGameRequest {
    gameId?: string;
    status?: EPersonalLibraryGameStatus;
    rank?: EPersonalLibraryGameRank;
    note?: string | null; 
}