import { IGameCompany } from "@/entities/company";
import { ICoverResponse } from "@/entities/cover";
import { IGenreResponse } from "@/entities/genre";
import { IKeywordResponse } from "@/entities/keyword";
import { IScreenshotResponse } from "@/entities/screenshot";

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
    cover?: ICoverResponse;
    screenshots: Array<IScreenshotResponse>;
    genres: Array<IGenreResponse>;
    keywords: Array<IKeywordResponse>;
    companies: Array<IGameCompany>;
}

export interface IPaginateGameResponse extends IGameResponse {
    cover?: ICoverResponse;
    genres: Array<IGenreResponse>;
}