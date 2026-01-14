import { IsEnum, IsNotEmpty } from 'class-validator';
import { EBattleVoteSide } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GameBattleVoteUpdateDto {
    @Expose()
    @IsNotEmpty()
    @IsEnum(EBattleVoteSide)
    side?: EBattleVoteSide;

    constructor(data: Partial<GameBattleVoteUpdateDto>) {
        Object.assign(this, data);
    }
}