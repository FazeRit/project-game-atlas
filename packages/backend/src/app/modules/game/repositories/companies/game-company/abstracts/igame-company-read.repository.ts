import { GameCompany } from '@prisma/client';
import { IReadRepository } from '../../../../../../shared/repositories/iread.repository';

export abstract class IGameCompanyReadRepository extends IReadRepository<GameCompany> {}

