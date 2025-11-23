import { Controller, Get, Param } from "@nestjs/common";
import { GetUser } from "../../../../shared/decorators/get-user.decorator";
import { PredictionResponseDto } from "../../dto/response";
import { RecommendationCuratorService } from "../../services/recommendation-curator/recommendation-curator.service";

@Controller('analytics')
export class AnalyticsReadController {
    constructor(
        private readonly recommendationCuratorService: RecommendationCuratorService
    ) {}

    @Get('predict/:gameId')
    async predictCompatibility(
        @GetUser('checksum') userId: string,
        @Param('gameId') gameId: string,
    ): Promise<PredictionResponseDto> {
        return this.recommendationCuratorService.predictCompatibility(
			userId,
			gameId
		);
    }
}