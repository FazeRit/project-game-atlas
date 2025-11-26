import { GamePlatform } from '@prisma/client';
import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';

export abstract class IGamePlatformReadRepository extends IReadRepository<GamePlatform> {}

