import { Provider } from "@nestjs/common";
import { IGameBattleReadRepository } from "../../repositories/game-battles/abstracts/igame-battles-read.repository";
import { IGameBattleWriteRepository } from "../../repositories/game-battles/abstracts/igame-battles-write.repository";
import { GameBattleReadRepository } from "../../repositories/game-battles/implementations/game-battles-read.repository";
import { GameBattleWriteRepository } from "../../repositories/game-battles/implementations/game-battles-write.repository";
import { GameBattleReadService } from "../../services/game-battles/game-battles-read/game-battles-read.service";
import { GameBattleWriteService } from "../../services/game-battles/game-battles-write/game-battles-write.service";

export const GAME_BATTLE_PROVIDERS: Array<Provider> = [
    {
        provide: IGameBattleReadRepository,
        useClass: GameBattleReadRepository
    },
    {
        provide: IGameBattleWriteRepository,
        useClass: GameBattleWriteRepository
    },
	GameBattleReadService,
	GameBattleWriteService
]