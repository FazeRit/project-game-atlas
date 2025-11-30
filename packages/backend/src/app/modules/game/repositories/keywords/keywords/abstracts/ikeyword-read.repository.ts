import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';
import { Keyword } from '@prisma/client';

export abstract class IKeywordReadRepository extends IReadRepository<Keyword> {
    abstract findAll(
        page: number,
        limit: number,
        search?: Record<string, unknown>,
    ): Promise<Array<Keyword>>;
    abstract count(): Promise<number>;
}

