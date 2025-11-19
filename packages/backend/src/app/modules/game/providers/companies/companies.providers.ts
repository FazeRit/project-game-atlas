import { CompanyReadRepository } from '../../repositories/companies/company/implementations/company-read.repository';
import { CompanyWriteRepository } from '../../repositories/companies/company/implementations/company-write.repository';
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
]

