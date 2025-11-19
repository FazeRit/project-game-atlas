import { Company } from '@prisma/client';
import { ICompanyReadRepository } from '../../../../repositories/companies/company/abstracts/icompany-read.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyReadService {
	constructor(
		private readonly companyReadRepository: ICompanyReadRepository,
	) {}

	async findById(checksum: string): Promise<Company | null> {
		return this.companyReadRepository.findById(checksum);
	}
}

