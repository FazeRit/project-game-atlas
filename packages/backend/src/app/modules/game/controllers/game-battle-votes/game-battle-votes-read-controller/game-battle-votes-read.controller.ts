import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { GameBattleVotesReadService } from "../../../services/game-battle-votes/game-battle-votes-read/game-battle-votes-read.service";
import { GetUser } from "../../../../../shared/decorators/get-user.decorator";
import { ApiResponseDto } from "../../../../../shared/dto/response/api-response.dto";
import { GameBattleVoteResponseDto } from "../../../dto";

@Controller('game-battle-votes')
export class GameBattleVotesReadController {
    constructor(
        private readonly gameBattleVotesReadService: GameBattleVotesReadService
    ) {}

    @Get('my-votes/:battleId')
    async findByUserAndBattle(
		@GetUser('checksum') userId: string,
        @Param('battleId') battleId: string
    ): Promise<ApiResponseDto<GameBattleVoteResponseDto | null>> {
        const gameBattleVote = await this.gameBattleVotesReadService.findByUserAndBattle(userId, battleId);

        const result = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data: gameBattleVote,
            timestamp: new Date().toISOString(),
            success: true
        })

        return result;
    }
}