import { GameCompany } from '@prisma/client';
import { GameCompanyCreateDto, GameCompanyUpdateDto } from '../../../../dto/request/game-company';
import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';

export abstract class IGameCompanyWriteRepository extends IWriteRepository<GameCompany, GameCompanyCreateDto, GameCompanyUpdateDto> {}

