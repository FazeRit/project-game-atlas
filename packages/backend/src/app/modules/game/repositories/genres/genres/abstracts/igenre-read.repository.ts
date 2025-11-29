import { Genre } from '@prisma/client';
import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';

export abstract class IGenreReadRepository extends IReadRepository<Genre> {
	abstract findAll(): Promise<Array<Genre>>;
}

