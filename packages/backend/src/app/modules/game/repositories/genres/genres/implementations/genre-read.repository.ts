import { Genre } from '@prisma/client';
import { IGenreReadRepository } from '../abstracts/igenre-read.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class GenreReadRepository implements IGenreReadRepository {
	constructor(private readonly prisma: PrismaService) { }

	async findById(checksum: string): Promise<Genre | null> {
		return this.prisma.genre.findUnique({
			where: {
				checksum
			}
		});
	}

	async findAll(): Promise<Array<Genre>> {
		return this.prisma.genre.findMany({
			where: {
				gameGenres: {
					some: {
						game: {}
					}
				}
			}
		});
	}
}

