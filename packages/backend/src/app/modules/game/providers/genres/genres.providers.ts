import { GenreReadRepository } from '../../repositories/genres/genres/implementations/genre-read.repository';
import { GenreWriteRepository } from '../../repositories/genres/genres/implementations/genre-write.repository';
import { IGenreReadRepository } from '../../repositories/genres/genres/abstracts/igenre-read.repository';
import { IGenreWriteRepository } from '../../repositories/genres/genres/abstracts/igenre-write.repository';
import { Provider } from '@nestjs/common';

export const GENRES_PROVIDERS: Array<Provider> = [
	{
		provide: IGenreReadRepository,
		useClass: GenreReadRepository,
	},
	{
		provide: IGenreWriteRepository,
		useClass: GenreWriteRepository,
	},
]

