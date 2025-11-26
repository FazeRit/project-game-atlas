import { Provider } from '@nestjs/common';
import { IGamePlatformReadRepository, IGamePlatformWriteRepository } from '../../repositories/platforms/game-platform/abstracts';
import { GamePlatformReadRepository, GamePlatformWriteRepository } from '../../repositories/platforms/game-platform/implementations';
import { GamePlatformsWriteService } from '../../services/platforms/game-platforms/game-platforms-write-service/game-platforms-write.service';
import { GamePlatformsReadService } from '../../services/platforms/game-platforms/game-platforms-read-service/game-platforms-read.service';

export const GAME_PLATFORM_PROVIDERS: Array<Provider> = [
    {
        provide: IGamePlatformReadRepository,
        useClass: GamePlatformReadRepository,
    },
    {
        provide: IGamePlatformWriteRepository,
        useClass: GamePlatformWriteRepository,
    },
    GamePlatformsReadService,
    GamePlatformsWriteService,
]