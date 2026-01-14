import { GameBattle, GameBattleVote } from '@prisma/client';
import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';
import { GameBattleVoteCreateDto, GameBattleVoteUpdateDto } from '../../../dto';
import { IGameBattleVoteInternalCreate } from '../../../interfaces/game-battle-votes/game-battle-votes.interfaces';

export abstract class IGameBattleVoteWriteRepository extends IWriteRepository<GameBattleVote, IGameBattleVoteInternalCreate, GameBattleVoteUpdateDto> {
    abstract vote(
        userId: string,
        data: GameBattleVoteCreateDto
    ): Promise<GameBattle>;
}