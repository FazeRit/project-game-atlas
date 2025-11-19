import { Game } from '@prisma/client';
import { IReadRepository } from '../../../../../shared/repositories/iread.repository';

export abstract class IGameReadRepository extends IReadRepository<Game> {}

