import { EBattleVoteSide } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsUUID, IsEnum } from "class-validator";

export class GameBattleVoteCreateDto {
    @Expose()
    @IsNotEmpty()
    @IsUUID('4')
    battleId: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(EBattleVoteSide)
    side: EBattleVoteSide;

    constructor(
        battleId: string,
        side: EBattleVoteSide
    ) {
        this.battleId = battleId;
        this.side = side;
    }
}