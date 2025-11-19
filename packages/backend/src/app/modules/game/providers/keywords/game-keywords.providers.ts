import { GameKeywordWriteRepository } from '../../repositories/keywords/game-keywords/implementations/game-keyword-write.repository';
import { IGameKeywordWriteRepository } from '../../repositories/keywords/game-keywords/abstracts/igame-keyword-write.repository';
import { Provider } from '@nestjs/common';

export const GAME_KEYWORD_PROVIDERS: Array<Provider> = [
	{
		provide: IGameKeywordWriteRepository,
		useClass: GameKeywordWriteRepository,
	},
]

