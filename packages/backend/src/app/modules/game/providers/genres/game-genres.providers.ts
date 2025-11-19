import { GameGenreReadRepository } from '../../repositories/genres/game-genres/implementations/game-genre-read.repository';
import { GameGenresReadService } from '../../services/genres/game-genres/game-genres-read-service/game-genres-read.service';
import { GameGenresWriteService } from '../../services/genres/game-genres/game-genres-write-service/game-genres-write.service';
import { GameGenreWriteRepository } from '../../repositories/genres/game-genres/implementations/game-genre-write.repository';
import { IGameGenreReadRepository } from '../../repositories/genres/game-genres/abstracts/igame-genre-read.repository';
import { IGameGenreWriteRepository } from '../../repositories/genres/game-genres/abstracts/igame-genre-write.repository';
import { Provider } from '@nestjs/common';

export const GAME_GENRE_PROVIDERS: Array<Provider> = [
	{
		provide: IGameGenreReadRepository,
		useClass: GameGenreReadRepository,
	},
	{
		provide: IGameGenreWriteRepository,
		useClass: GameGenreWriteRepository,
	},
	GameGenresReadService,
	GameGenresWriteService,
]

