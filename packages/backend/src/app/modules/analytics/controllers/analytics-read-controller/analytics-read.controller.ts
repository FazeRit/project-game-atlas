import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { GetUser } from "../../../../shared/decorators/get-user.decorator";
import { PredictionResponseDto } from "../../dto/response";
import { RecommendationCuratorService } from "../../services/recommendation-curator/recommendation-curator.service";
import { ApiResponseDto } from "../../../../shared/dto/response/api-response.dto";

@Controller('analytics')
export class AnalyticsReadController {
    constructor(
        private readonly recommendationCuratorService: RecommendationCuratorService
    ) {}

    @Get('predict/:gameId')
    async predictCompatibility(
        @GetUser('checksum') userId: string,
        @Param('gameId') gameId: string,
    ): Promise<ApiResponseDto<PredictionResponseDto>> {
        const data =  await this.recommendationCuratorService.predictCompatibility(
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
}