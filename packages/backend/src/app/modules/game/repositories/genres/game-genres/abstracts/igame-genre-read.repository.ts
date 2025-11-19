import { GameGenre } from '@prisma/client';
import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';

export abstract class IGameGenreReadRepository extends IReadRepository<GameGenre> {}

