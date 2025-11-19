import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';
import { Platform } from '@prisma/client';

export abstract class IPlatformReadRepository extends IReadRepository<Platform> {}

