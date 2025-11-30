import { IGameDetailsResponse, IPaginateGameResponse } from '@/entities/game';
import { EPersonalLibraryGameRank, EPersonalLibraryGameStatus } from '../enums';

export interface IPersonalLibraryGame {
    checksum: string;
    gameId: string;
    personalLibraryId: string;
    status: EPersonalLibraryGameStatus;
    rank: EPersonalLibraryGameRank;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPaginatePersonalLibraryGame extends IPersonalLibraryGame {
    game: IPaginateGameResponse;
}

export interface IPersonalLibraryGameDetails extends IPersonalLibraryGame {
    game: IGameDetailsResponse
}