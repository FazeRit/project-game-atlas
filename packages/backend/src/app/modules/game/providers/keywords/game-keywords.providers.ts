import { GameKeywordsReadService } from '../../services/keywords/game-keywords/game-keywords-read-service/game-keywords-read.service';
import { GameKeywordsWriteService } from '../../services/keywords/game-keywords/game-keywords-write-service/game-keywords-write.service';
import { GameKeywordWriteRepository } from '../../repositories/keywords/game-keywords/implementations/game-keyword-write.repository';
import { IGameKeywordWriteRepository } from '../../repositories/keywords/game-keywords/abstracts/igame-keyword-write.repository';
import { Provider } from '@nestjs/common';
import { IGameKeywordReadRepository } from '../../repositories/keywords/game-keywords/abstracts/igame-keyword-read.repository';
import { GameKeywordReadRepository } from '../../repositories/keywords/game-keywords/implementations/game-keyword-read.repository';

export const GAME_KEYWORD_PROVIDERS: Array<Provider> = [
	{
		provide: IGameKeywordWriteRepository,
		useClass: GameKeywordWriteRepository,
	},
	{
		provide: IGameKeywordReadRepository,
		useClass: GameKeywordReadRepository,
	},
	GameKeywordsReadService,
	GameKeywordsWriteService,
]

