import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { GameBattleReadService } from "../../../services/game-battles/game-battles-read/game-battles-read.service";
import { ApiResponseDto } from "../../../../../shared/dto/response/api-response.dto";
import { GameBattleResponseDto } from "../../../dto";

@Controller('game-battles')
export class GameBattlesReadController {
    constructor(
        private readonly gameBattlesReadService: GameBattleReadService
    ) {}

    @Get('active')
    async findActive(): Promise<ApiResponseDto<GameBattleResponseDto | null>> {
        const data = await this.gameBattlesReadService.findActive();

        const response = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data,
            timestamp: new Date().toISOString(),
            success: true
        });

        return response;
    }

    @Get(':checksum')
    async findById(
        @Param('checksum') checksum: string
    ): Promise<ApiResponseDto<GameBattleResponseDto>> {
        const data = await this.gameBattlesReadService.findById(checksum);

        const response = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data,
            timestamp: new Date().toISOString(),
            success: true
        });

        return response;
    }
}