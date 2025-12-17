import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { GetUser } from "../../../../shared/decorators/get-user.decorator";
import { RecommendationCuratorService } from "../../services/recommendation-curator/recommendation-curator.service";
import { ApiResponseDto } from "../../../../shared/dto/response/api-response.dto";
import { PredictionResponseDto, RecommendationItemResponseDto } from "../../dto";

@Controller('analytics')
export class AnalyticsReadController {
    constructor(
        private readonly recommendationCuratorService: RecommendationCuratorService
    ) { }

    @Get('predict/:gameId')
    async predictCompatibility(
        @GetUser('checksum') userId: string,
        @Param('gameId') gameId: string,
    ): Promise<ApiResponseDto<PredictionResponseDto>> {
        const data = await this.recommendationCuratorService.predictCompatibility(
            userId,
            gameId
        );

        const response = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data,
            timestamp: new Date().toISOString(),
            success: true,
        })

        return response;
    }

    @Get('recommandations')
    async getRecommandations(
        @GetUser('checksum') userId: string,
    ): Promise<ApiResponseDto<Array<RecommendationItemResponseDto>>> {
        const data = await this.recommendationCuratorService.getRecommandations(
            userId,
        );

        const response = new ApiResponseDto({
            statusCode: HttpStatus.OK,
            data,
            timestamp: new Date().toISOString(),
            success: true,
        })

        return response;
    }
}