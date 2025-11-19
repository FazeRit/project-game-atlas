import { Company } from '@prisma/client';
import { CompanyCreateDto } from '../../../../dto/request/company/company-create.dto';
import { CompanyUpdateDto } from '../../../../dto/request/company/company-update.dto';
import { ICompanyWriteRepository } from '../abstracts/icompany-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class CompanyWriteRepository implements ICompanyWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CompanyCreateDto): Promise<Company | null> {
		return this.prisma.company.create({
			data
		});
	}

	async update(checksum: string, data: CompanyUpdateDto): Promise<Company | null> {
		return this.prisma.company.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.company.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<CompanyCreateDto>): Promise<void> {
		await this.prisma.company.createMany({
			data,
			skipDuplicates: true
		});
	}
}

