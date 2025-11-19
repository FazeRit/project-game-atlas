import { IKeywordWriteRepository } from '../abstracts/ikeyword-write.repository';
import { Injectable } from '@nestjs/common';
import { Keyword } from '@prisma/client';
import { KeywordCreateDto, KeywordUpdateDto } from '../../../../dto';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class KeywordWriteRepository implements IKeywordWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: KeywordCreateDto): Promise<Keyword | null> {
		return this.prisma.keyword.create({
			data
		});
	}

	async update(checksum: string, data: KeywordUpdateDto): Promise<Keyword | null> {
		return this.prisma.keyword.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.keyword.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<KeywordCreateDto>): Promise<void> {
		await this.prisma.keyword.createMany({
			data,
			skipDuplicates: true
		});
	}
}

