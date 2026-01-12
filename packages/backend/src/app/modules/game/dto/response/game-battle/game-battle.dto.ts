import { Expose } from 'class-transformer';

export class GameBattleResponseDto {
    @Expose()
    checksum: string;

    @Expose()
    gameAId: string;

    @Expose()
    gameBId: string;

    @Expose()
    votesA: number;

    @Expose()
    votesB: number;

    @Expose()
    isActive: boolean;

    @Expose()
    endsAt: Date;

    @Expose()
    createdAt: Date;

    @Expose()
    get totalVotes(): number {
        return (this.votesA || 0) + (this.votesB || 0);
    }

    @Expose()
    get isExpired(): boolean {
        return new Date() > this.endsAt;
    }

    constructor(data: {
        checksum: string;
        gameAId: string;
        gameBId: string;
        votesA: number;
        votesB: number;
        isActive: boolean;
        endsAt: Date;
        createdAt: Date;
    }) {
        this.checksum = data.checksum;
        this.gameAId = data.gameAId;
        this.gameBId = data.gameBId;
        this.votesA = data.votesA;
        this.votesB = data.votesB;
        this.isActive = data.isActive;
        this.endsAt = data.endsAt;
        this.createdAt = data.createdAt;
    }
}