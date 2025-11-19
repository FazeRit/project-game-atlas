import { GameGenreWriteRepository } from '../../repositories/genres/game-genres/implementations/game-genre-write.repository';
import { IGameGenreWriteRepository } from '../../repositories/genres/game-genres/abstracts/igame-genre-write.repository';
import { Provider } from '@nestjs/common';

export const GAME_GENRE_PROVIDERS: Array<Provider> = [
	{
		provide: IGameGenreWriteRepository,
		useClass: GameGenreWriteRepository,
	},
]

