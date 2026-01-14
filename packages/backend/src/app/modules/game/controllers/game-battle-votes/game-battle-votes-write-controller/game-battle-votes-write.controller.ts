import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { GameBattleVoteWriteService } from "../../../services/game-battle-votes/game-battle-votes-write/game-battle-votes-write.service";
import { GameBattleVoteCreateDto } from "../../../dto";
import { GetUser } from "../../../../../shared/decorators/get-user.decorator";
import { ApiResponseDto } from "../../../../../shared/dto/response/api-response.dto";

@Controller('game-battle-votes')
export class GameBattleVotesWriteController {
    constructor(
        private readonly gameBattleVotesWriteService: GameBattleVoteWriteService
    ) {}

    @Post()
    async vote( 
        @GetUser('checksum') userId: string,
        @Body() data: GameBattleVoteCreateDto
    ): Promise<ApiResponseDto<null>> {
        await this.gameBattleVotesWriteService.vote(userId, data);
    
        const result = new ApiResponseDto({
            statusCode: HttpStatus.CREATED,
            data: null,
            timestamp: new Date().toISOString(),
            success: true
        })

        return result;
    }
}