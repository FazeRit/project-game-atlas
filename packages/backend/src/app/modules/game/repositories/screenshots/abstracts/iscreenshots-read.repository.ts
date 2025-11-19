import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { Screenshots } from '@prisma/client';

export abstract class IScreenshotsReadRepository extends IReadRepository<Screenshots> {}

