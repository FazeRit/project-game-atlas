import { Expose } from 'class-transformer';

export class MatchResponseDto<T> {
    @Expose()
    score: number;

    @Expose()
    item: T;

    constructor(data: {
        item: T,
        score: number
    }) {
        this.item = data.item;
        this.score = data.score;
    }
}