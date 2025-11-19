import { Company } from '@prisma/client';
import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';

export abstract class ICompanyReadRepository extends IReadRepository<Company> {}

