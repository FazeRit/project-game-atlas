import { IGameCompany } from "@/entities/company";
import { ICover } from "@/entities/cover";
import { IGenreResponse } from "@/entities/genre";
import { IKeywordResponse } from "@/entities/keyword";
import { IScreenshot } from "@/entities/screenshot/model/interfaces/screenshot.interface";

export interface IGameResponse {
    checksum: string;
    name: string;
    summary?: string;
    storyline?: string;
    totalRating?: number;
    totalRatingCount?: number;
    url?: string;
    firstReleaseDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGameDetailsResponse extends IGameResponse {
    cover?: ICover;
    screenshots: Array<IScreenshot>;
    genres: Array<IGenreResponse>;
    keywords: Array<IKeywordResponse>;
    companies: Array<IGameCompany>;
}

export interface IPaginateGameResponse extends IGameResponse {
    cover?: ICover;
    genres: Array<IGenreResponse>;
}