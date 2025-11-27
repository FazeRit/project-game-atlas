import { BadRequestException, Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';
import { GenreCreateDto } from '../../../../dto/request/genres/genre-create.dto';
import { GenreReadService } from '../genres-read-service/genre-read.service';
import { GenreUpdateDto } from '../../../../dto/request/genres/genre-update.dto';
import { IGenreWriteRepository } from '../../../../repositories/genres/genres/abstracts/igenre-write.repository';

@Injectable()
export class GenreWriteService {
	constructor(
		private readonly genreReadService: GenreReadService,
		private readonly genreWriteRepository: IGenreWriteRepository,
	) {}

	async create(data: GenreCreateDto): Promise<Genre> {
		const genre = await this.genreWriteRepository.create(data);

		if (!genre) {
			throw new BadRequestException('Failed to create genre');
		}

		return genre;
	}

	async update(checksum: string, data: GenreUpdateDto): Promise<Genre> {
		const existingGenre = await this.genreReadService.findById(checksum);

		if (!existingGenre) {
			throw new BadRequestException('Genre not found');
		}

		const updatedGenre = await this.genreWriteRepository.update(checksum, data);

		if (!updatedGenre) {
			throw new BadRequestException('Failed to update genre');
		}

		return updatedGenre;
	}

	async delete(checksum: string): Promise<void> {
		const existingGenre = await this.genreReadService.findById(checksum);

		if (!existingGenre) {
			throw new BadRequestException('Genre not found');
		}

		await this.genreWriteRepository.delete(checksum);
	}

	async createMany(data: Array<GenreCreateDto>): Promise<void> {
		await this.genreWriteRepository.createMany(data);
	}
}

