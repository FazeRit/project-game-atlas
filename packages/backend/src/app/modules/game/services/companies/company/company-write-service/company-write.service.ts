import { BadRequestException, Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { CompanyCreateDto } from '../../../../dto/request/company/company-create.dto';
import { CompanyReadService } from '../company-read-service/company-read.service';
import { CompanyUpdateDto } from '../../../../dto/request/company/company-update.dto';
import { ICompanyWriteRepository } from '../../../../repositories/companies/company/abstracts/icompany-write.repository';

@Injectable()
export class CompanyWriteService {
	constructor(
		private readonly companyReadService: CompanyReadService,
		private readonly companyWriteRepository: ICompanyWriteRepository,
	) {}

	async create(data: CompanyCreateDto): Promise<Company> {
		const company = await this.companyWriteRepository.create(data);

		if (!company) {
			throw new BadRequestException('Failed to create company');
		}

		return company;
	}

	async update(checksum: string, data: CompanyUpdateDto): Promise<Company> {
		const existingCompany = await this.companyReadService.findById(checksum);

		if (!existingCompany) {
			throw new BadRequestException('Company not found');
		}

		const updatedCompany = await this.companyWriteRepository.update(checksum, data);

		if (!updatedCompany) {
			throw new BadRequestException('Failed to update company');
		}

		return updatedCompany;
	}

	async delete(checksum: string): Promise<void> {
		const existingCompany = await this.companyReadService.findById(checksum);

		if (!existingCompany) {
			throw new BadRequestException('Company not found');
		}

		await this.companyWriteRepository.delete(checksum);
	}

	async createMany(data: Array<CompanyCreateDto>): Promise<void> {
		await this.companyWriteRepository.createMany(data);
	}
}

