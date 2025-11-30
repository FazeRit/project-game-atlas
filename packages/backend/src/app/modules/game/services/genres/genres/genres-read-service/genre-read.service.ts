import { Genre } from '@prisma/client';
import { IGenreReadRepository } from '../../../../repositories/genres/genres/abstracts/igenre-read.repository';
import { Injectable } from '@nestjs/common';
import { GenreResponseDto } from '../../../../dto';

@Injectable()
export class GenreReadService {
	constructor(
		private readonly genreReadRepository: IGenreReadRepository,
	) {}

	async findById(checksum: string): Promise<Genre | null> {
		return this.genreReadRepository.findById(checksum);
	}

	async findAll(): Promise<Array<GenreResponseDto>> {
		return this.genreReadRepository.findAll();
	}
}

