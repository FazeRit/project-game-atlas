import { IGameDetailsResponse, IPaginateGameResponse } from '@/entities/game';
import { EPersonalLibraryGameRank, EPersonalLibraryGameStatus } from '../enums';

export interface IPersonalLibraryGameResponse {
    checksum: string;
    gameId: string;
    personalLibraryId: string;
    status: EPersonalLibraryGameStatus;
    rank: EPersonalLibraryGameRank;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPaginatePersonalLibraryGame extends IPersonalLibraryGameResponse {
    game: IPaginateGameResponse;
}

export interface IPersonalLibraryGameDetails extends IPersonalLibraryGameResponse {
    game: IGameDetailsResponse
}