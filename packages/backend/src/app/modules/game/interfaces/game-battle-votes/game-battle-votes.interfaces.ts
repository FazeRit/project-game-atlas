import { GameBattleVoteCreateDto } from "../../dto";

export interface IGameBattleVoteInternalCreate extends GameBattleVoteCreateDto {
    userId: string;
}