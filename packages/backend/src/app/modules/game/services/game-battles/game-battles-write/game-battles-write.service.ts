import { GameBattle } from "@prisma/client";
import { GameBattleCreateDto, GameBattleUpdateDto, GameBattleVoteCreateDto } from "../../../dto";
import { IGameBattleWriteRepository } from "../../../repositories/game-battles/abstracts/igame-battles-write.repository";
import { Cron, CronExpression } from "@nestjs/schedule";
import { GameBattleReadService } from "../game-battles-read/game-battles-read.service";

export class GameBattleWriteService {
    constructor(
        private readonly gameBattleWriteRepository: IGameBattleWriteRepository,
        private readonly gameBattleReadService: GameBattleReadService
    ) {}

    async create(data: GameBattleCreateDto): Promise<void | null> {
        await this.gameBattleWriteRepository.create(data);
    }
    
    async update(
        checksum: string,
        data: GameBattleUpdateDto
    ): Promise<GameBattle | null> {
        await this.gameBattleReadService.findById(checksum)

        const updatedGameBattle = await this.gameBattleWriteRepository.update(checksum, data);

        return updatedGameBattle;
    }

    async delete(checksum: string): Promise<void> {
        await this.gameBattleReadService.findById(checksum)

        await this.gameBattleWriteRepository.delete(checksum);
    }

    async createMany(data: Array<GameBattleCreateDto>): Promise<void> {
        await this.gameBattleWriteRepository.createMany(data);
    }

    async vote(
        userId: string,
        data: GameBattleVoteCreateDto,
    ): Promise<void> {
        await this.gameBattleWriteRepository.vote(userId, data);
    }

    @Cron(CronExpression.EVERY_HOUR)
    async deactiveAllInactive(): Promise<void> {
        await this.gameBattleWriteRepository.deactiveAllInactive();
    }
}