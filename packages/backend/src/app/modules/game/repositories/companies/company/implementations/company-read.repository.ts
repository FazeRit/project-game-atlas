import { Company } from '@prisma/client';
import { ICompanyReadRepository } from '../abstracts/icompany-read.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class CompanyReadRepository implements ICompanyReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<Company | null> {
		return this.prisma.company.findUnique({
			where: {
				checksum
			}
		});
	}
}

