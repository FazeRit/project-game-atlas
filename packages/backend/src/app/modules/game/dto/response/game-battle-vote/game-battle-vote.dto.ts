import { Expose } from 'class-transformer';
import { EBattleVoteSide } from '@prisma/client';

export class GameBattleVoteResponseDto {
    @Expose()
    checksum: string;

    @Expose()
    userId: string;

    @Expose()
    battleId: string;

    @Expose()
    side: EBattleVoteSide;

    @Expose()
    createdAt: Date;

    constructor(data: {
        checksum: string;
        userId: string;
        battleId: string;
        side: EBattleVoteSide;
        createdAt: Date;
    }) {
        this.checksum = data.checksum;
        this.userId = data.userId;
        this.battleId = data.battleId;
        this.side = data.side;
        this.createdAt = data.createdAt;
    }
}