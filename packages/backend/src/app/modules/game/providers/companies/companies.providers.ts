import { CompanyReadRepository } from '../../repositories/companies/company/implementations/company-read.repository';
import { CompanyReadService } from '../../services/companies/company/company-read-service/company-read.service';
import { CompanyWriteRepository } from '../../repositories/companies/company/implementations/company-write.repository';
import { CompanyWriteService } from '../../services/companies/company/company-write-service/company-write.service';
import { ICompanyReadRepository } from '../../repositories/companies/company/abstracts/icompany-read.repository';
import { ICompanyWriteRepository } from '../../repositories/companies/company/abstracts/icompany-write.repository';
import { Provider } from '@nestjs/common';

export const COMPANIES_PROVIDERS: Array<Provider> = [
	{
		provide: ICompanyReadRepository,
		useClass: CompanyReadRepository,
	},
	{
		provide: ICompanyWriteRepository,
		useClass: CompanyWriteRepository,
	},
	CompanyReadService,
	CompanyWriteService,
]

