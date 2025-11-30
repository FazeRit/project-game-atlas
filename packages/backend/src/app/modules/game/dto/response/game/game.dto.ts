import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameResponseDto {
    @Expose()
    checksum: string;

    @Expose()
    name: string;

    @Expose()
    summary?: string;

    @Expose()
    storyline?: string;

    @Expose()
    totalRating?: number;

    @Expose()
    totalRatingCount?: number;

    @Expose()
    url?: string;

    @Expose()
    firstReleaseDate?: Date;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    constructor(data: {
        checksum: string,
        name: string,
        summary: string | null
        storyline: string | null
        totalRating: number | null
        totalRatingCount: number | null
        url: string | null
        firstReleaseDate: Date | null
        createdAt: Date
        updatedAt: Date
    }) {
        this.checksum = data.checksum;
        this.name = data.name;
        this.summary = data.summary ?? undefined;
        this.storyline = data.storyline ?? undefined;
        this.totalRating = data.totalRating ?? undefined;
        this.totalRatingCount = data.totalRatingCount ?? undefined;
        this.url = data.url ?? undefined;
        this.firstReleaseDate = data.firstReleaseDate ?? undefined;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
