import { GameBattle } from '@prisma/client';
import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';
import { GameBattleCreateDto, GameBattleUpdateDto } from '../../../dto/request/game-battle';

export abstract class IGameBattleWriteRepository extends IWriteRepository<GameBattle, GameBattleCreateDto, GameBattleUpdateDto> {
    abstract deactiveAllInactive(): Promise<void>;
}