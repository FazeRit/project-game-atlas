import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { GameBattleVoteCreateDto, GameBattleVoteUpdateDto } from "../../../dto";
import { IGameBattleVoteWriteRepository } from "../../../repositories/game-battle-votes/abstracts/igame-battle-votes-write.repository";
import { GameBattleVotesReadService } from "../game-battle-votes-read/game-battle-votes-read.service";
import { GameBattleReadService } from "../../game-battles/game-battles-read/game-battles-read.service";
import { IGameBattleVoteInternalCreate } from "../../../interfaces/game-battle-votes/game-battle-votes.interfaces";
import { GameBattlesGateways } from "../../../gateways/game-battles/game-battles.gateways";

@Injectable()
export class GameBattleVoteWriteService {
    constructor(
        private readonly gameBattleVoteWriteRepository: IGameBattleVoteWriteRepository,
        private readonly gameBattleVotesReadService: GameBattleVotesReadService,
        private readonly gameBattleReadService: GameBattleReadService,
        private readonly gameBattlesGateways: GameBattlesGateways
    ) {}

    async create(userId: string, data: GameBattleVoteCreateDto): Promise<void | null> {
        await this.gameBattleVoteWriteRepository.create({
            userId,
            ...data
        });
    }

    async update(
        checksum: string,
        data: GameBattleVoteUpdateDto
    ): Promise<void> {
        await this.gameBattleVotesReadService.findById(checksum)

        await this.gameBattleVoteWriteRepository.update(checksum, data);
    }

    async delete(checksum: string): Promise<void> {
        await this.gameBattleVotesReadService.findById(checksum)

        await this.gameBattleVoteWriteRepository.delete(checksum);
    }

    async createMany(userId: string, data: Array<GameBattleVoteCreateDto>): Promise<void> {
        const createData: Array<IGameBattleVoteInternalCreate> = data.map(item => ({
            ...item,
            userId,
        }));

        await this.gameBattleVoteWriteRepository.createMany(createData);
    }

    async vote(
        userId: string,
        data: GameBattleVoteCreateDto,
    ): Promise<void> {
        const {
            battleId
        } = data;

        const now = new Date();

        const gameBattle = await this.gameBattleReadService.findById(battleId);

        if (!gameBattle) {
            throw new NotFoundException(`Battle with checksum ${battleId} not found`);
        }

        if (!gameBattle.isActive || now > gameBattle.endsAt) {
            throw new BadRequestException('This battle has already ended or is inactive');
        }

        const updatedBattle = await this.gameBattleVoteWriteRepository.vote(userId, data);

        this.gameBattlesGateways.emitBattleUpdate(battleId, updatedBattle.votesA, updatedBattle.votesB);
    }
}``