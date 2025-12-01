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

export interface IPaginatePersonalLibraryGameResponse extends IPersonalLibraryGameResponse {
    game: IPaginateGameResponse;
}

export interface IPersonalLibraryGameDetailsResponse extends IPersonalLibraryGameResponse {
    game: IGameDetailsResponse
}