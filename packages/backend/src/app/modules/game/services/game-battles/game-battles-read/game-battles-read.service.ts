import { IGameBattleReadRepository } from "../../../repositories/game-battles/abstracts/igame-battles-read.repository";
import { GameBattleResponseDto } from "../../../dto/response/game-battle/game-battle.dto";
import { NotFoundException } from "@nestjs/common";

export class GameBattleReadService {
    constructor(
        private readonly gameBattleReadRepository: IGameBattleReadRepository,
    ) {}

    async findById(checksum: string): Promise<GameBattleResponseDto> {
        const gameBattle = await this.gameBattleReadRepository.findById(checksum);

        if (!gameBattle) {
            throw new NotFoundException(`Battle with checksum ${checksum} not found`);
        }

        return new GameBattleResponseDto({
            checksum: gameBattle.checksum,
            gameAId: gameBattle.gameAId,
            gameBId: gameBattle.gameBId,
            votesA: gameBattle.votesA,
            votesB: gameBattle.votesB,
            isActive: gameBattle.isActive,
            endsAt: gameBattle.endsAt,
            createdAt: gameBattle.createdAt,
        });
    }

    async findActive(): Promise<GameBattleResponseDto | null> {
        const gameBattle = await this.gameBattleReadRepository.findActive();

        if (!gameBattle) {
            return null;
        }

        return new GameBattleResponseDto({
            checksum: gameBattle.checksum,
            gameAId: gameBattle.gameAId,
            gameBId: gameBattle.gameBId,
            votesA: gameBattle.votesA,
            votesB: gameBattle.votesB,
            isActive: gameBattle.isActive,
            endsAt: gameBattle.endsAt,
            createdAt: gameBattle.createdAt,
        });
    }
} 