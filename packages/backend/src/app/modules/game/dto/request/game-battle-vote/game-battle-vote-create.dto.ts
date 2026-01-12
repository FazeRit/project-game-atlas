import { IsEnum, IsUUID, IsNotEmpty } from 'class-validator';
import { EBattleVoteSide } from '@prisma/client';

export class GameBattleVoteCreateDto {
    @IsNotEmpty()
    @IsUUID('4')
    battleId: string;

    @IsNotEmpty()
    @IsEnum(EBattleVoteSide)
    side: EBattleVoteSide;

    constructor(data: {
        battleId: string,
        side: EBattleVoteSide
    }) {
        this.battleId = data.battleId;
        this.side = data.side;
    }
}