import { IGameCompany } from "@/entities/company";
import { ICover } from "@/entities/cover";
import { IGenre } from "@/entities/genre";
import { IKeyword } from "@/entities/keyword";
import { IScreenshot } from "@/entities/screenshot/model/interfaces/screenshot.interface";

export interface IGame {
    checksum: string;
    name: string;

    summary?: string;
    storyline?: string;
    totalRating?: number;
    totalRatingCount?: number;
    url?: string;
    firstReleaseDate?: Date;

    cover?: ICover;
    screenshots: Array<IScreenshot>;
    genres: Array<IGenre>;
    keywords: Array<IKeyword>;

    companies: Array<IGameCompany>;

    createdAt: Date;
    updatedAt: Date;
}