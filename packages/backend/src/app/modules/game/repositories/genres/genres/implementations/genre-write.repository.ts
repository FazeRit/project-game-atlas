import { Genre } from '@prisma/client';
import { GenreCreateDto, GenreUpdateDto } from '../../../../dto';
import { IGenreWriteRepository } from '../abstracts/igenre-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GenreWriteRepository implements IGenreWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: GenreCreateDto): Promise<Genre | null> {
		return this.prisma.genre.create({
			data
		});
	}

	async update(checksum: string, data: GenreUpdateDto): Promise<Genre | null> {
		return this.prisma.genre.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.genre.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<GenreCreateDto>): Promise<void> {
		await this.prisma.genre.createMany({
			data,
			skipDuplicates: true
		});
	}
}

