import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';
import { PlatformType } from '@prisma/client';

export abstract class IPlatformTypeReadRepository extends IReadRepository<PlatformType> {}

