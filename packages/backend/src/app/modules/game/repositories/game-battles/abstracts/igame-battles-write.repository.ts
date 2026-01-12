import { GameBattle } from '@prisma/client';
import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';
import { GameBattleCreateDto, GameBattleUpdateDto } from '../../../dto/request/game-battle';
import { GameBattleVoteCreateDto } from '../../../dto';

export abstract class IGameBattleWriteRepository extends IWriteRepository<GameBattle, GameBattleCreateDto, GameBattleUpdateDto> {
    abstract vote(
        userId: string,
        data: GameBattleVoteCreateDto
    ): Promise<void>;

    abstract deactiveAllInactive(): Promise<void>;
}