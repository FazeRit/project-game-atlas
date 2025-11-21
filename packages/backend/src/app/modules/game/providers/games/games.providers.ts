import { GameMapService } from '../../services/games/game-map-service/game-map.service';
import { GameReadRepository } from '../../repositories/games/implementations/game-read.repository';
import { GameReadService } from '../../services/games/game-read-service/game-read.service';
import { GameWriteRepository } from '../../repositories/games/implementations/game-write.repository';
import { GameWriteService } from '../../services/games/game-write-service/game-write.service';
import { IGameReadRepository } from '../../repositories/games/abstracts/igame-read.repository';
import { IGameWriteRepository } from '../../repositories/games/abstracts/igame-write.repository';
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
	GameMapService,
]

