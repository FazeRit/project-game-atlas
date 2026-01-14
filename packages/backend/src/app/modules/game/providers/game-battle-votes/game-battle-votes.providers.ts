import { Provider } from "@nestjs/common";
import { IGameBattleVoteReadRepository } from "../../repositories/game-battle-votes/abstracts/igame-battle-votes-read.repository";
import { GameBattleVoteReadRepository } from "../../repositories/game-battle-votes/implementations/game-battle-votes-read.repository";
import { IGameBattleVoteWriteRepository } from "../../repositories/game-battle-votes/abstracts/igame-battle-votes-write.repository";
import { GameBattleVoteWriteRepository } from "../../repositories/game-battle-votes/implementations/game-battle-votes-write.repository";
import { GameBattleVoteWriteService } from "../../services/game-battle-votes/game-battle-votes-write/game-battle-votes-write.service";
import { GameBattleVotesReadService } from "../../services/game-battle-votes/game-battle-votes-read/game-battle-votes-read.service";

export const GAME_BATTLE_VOTE_PROVIDERS: Array<Provider> = [
    {
        provide: IGameBattleVoteReadRepository,
        useClass: GameBattleVoteReadRepository
    },
    {
        provide: IGameBattleVoteWriteRepository,
        useClass: GameBattleVoteWriteRepository
    },
    GameBattleVoteWriteService,
    GameBattleVotesReadService
]