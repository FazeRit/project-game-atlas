import { GameReadRepository } from '../../repositories/game/implementations/game-read.repository';
import { GameWriteRepository } from '../../repositories/game/implementations/game-write.repository';
import { IGameReadRepository } from '../../repositories/game/abstracts/igame-read.repository';
import { IGameWriteRepository } from '../../repositories/game/abstracts/igame-write.repository';
import { Provider } from '@nestjs/common';

export const GAME_PROVIDERS: Array<Provider> = [
	{
		provide: IGameReadRepository,
		useClass: GameReadRepository,
	},
	{
		provide: IGameWriteRepository,
		useClass: GameWriteRepository,
	},
]