import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';
import { Keyword } from '@prisma/client';

export abstract class IKeywordReadRepository extends IReadRepository<Keyword> {}

