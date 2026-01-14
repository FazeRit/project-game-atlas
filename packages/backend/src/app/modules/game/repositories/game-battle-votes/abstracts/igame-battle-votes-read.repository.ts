import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { GameBattleVote } from '@prisma/client';

export abstract class IGameBattleVoteReadRepository extends IReadRepository<GameBattleVote> {
    abstract findByUserAndBattle(userId: string, battleId: string): Promise<GameBattleVote | null>;
}