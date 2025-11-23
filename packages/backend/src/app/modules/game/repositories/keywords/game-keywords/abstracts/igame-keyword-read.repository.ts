import { GameKeyword } from '@prisma/client';
import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';

export abstract class IGameKeywordReadRepository extends IReadRepository<GameKeyword> {}

