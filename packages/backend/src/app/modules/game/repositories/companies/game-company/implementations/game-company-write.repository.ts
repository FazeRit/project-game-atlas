import { GameCompany } from '@prisma/client';
import { GameCompanyCreateDto, GameCompanyUpdateDto } from '../../../../dto/request/game-company';
import { IGameCompanyWriteRepository } from '../abstracts/igame-company-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GameCompanyWriteRepository implements IGameCompanyWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: GameCompanyCreateDto): Promise<GameCompany | null> {
		return this.prisma.gameCompany.create({
			data
		});
	}

	async update(checksum: string, data: GameCompanyUpdateDto): Promise<GameCompany | null> {
		return this.prisma.gameCompany.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.gameCompany.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<GameCompanyCreateDto>): Promise<void> {
		await this.prisma.gameCompany.createMany({
			data,
			skipDuplicates: true
		});
	}
}

