import { Injectable, NotFoundException } from "@nestjs/common";
import { GameBattleVoteResponseDto } from "../../../dto";
import { IGameBattleVoteReadRepository } from "../../../repositories/game-battle-votes/abstracts/igame-battle-votes-read.repository";

@Injectable()
export class GameBattleVotesReadService {
    constructor(
        private readonly gameBattlesVoteReadRepository: IGameBattleVoteReadRepository
    ) {}

    async findById(checksum: string): Promise<GameBattleVoteResponseDto> {
        const gameBattleVote = await this.gameBattlesVoteReadRepository.findById(checksum);

        if (!gameBattleVote) {
            throw new NotFoundException(`Battle vote with checksum ${checksum} not found`);
        }

        const result = new GameBattleVoteResponseDto({
            checksum: gameBattleVote.checksum,
            userId: gameBattleVote.userId,
            battleId: gameBattleVote.battleId,
            side: gameBattleVote.side,
            createdAt: gameBattleVote.createdAt,
        });

        return result;
    }

    async findByUserAndBattle(userId: string, battleId: string): Promise<GameBattleVoteResponseDto | null> {
        const gameBattleVote = await this.gameBattlesVoteReadRepository.findByUserAndBattle(userId, battleId);

        if (!gameBattleVote) {
            throw new NotFoundException(`Battle vote for user ${userId} and battle ${battleId}}`);
        }

        const result = new GameBattleVoteResponseDto({
            checksum: gameBattleVote.checksum,
            userId: gameBattleVote.userId,
            battleId: gameBattleVote.battleId,
            side: gameBattleVote.side,
            createdAt: gameBattleVote.createdAt,
        });

        return result;
    }
}