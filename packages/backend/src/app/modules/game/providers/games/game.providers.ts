import { GameReadRepository } from '../../repositories/game/implementations/game-read.repository';
import { GameReadService } from '../../services/game/game-read-service/game-read.service';
import { GameWriteRepository } from '../../repositories/game/implementations/game-write.repository';
import { GameWriteService } from '../../services/game/game-write-service/game-write.service';
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
	GameReadService,
	GameWriteService,
]