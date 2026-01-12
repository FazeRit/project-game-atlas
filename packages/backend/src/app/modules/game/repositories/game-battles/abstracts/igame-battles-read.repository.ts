import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { GameBattle } from '@prisma/client';

export abstract class IGameBattleReadRepository extends IReadRepository<GameBattle> {
	abstract findActive(): Promise<GameBattle | null>;
}