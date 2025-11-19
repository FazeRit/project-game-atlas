import { Company } from '@prisma/client';
import { CompanyCreateDto } from '../../../../dto/request/company/company-create.dto';
import { CompanyUpdateDto } from '../../../../dto/request/company/company-update.dto';
import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';

export abstract class ICompanyWriteRepository extends IWriteRepository<Company, CompanyCreateDto, CompanyUpdateDto> {}

