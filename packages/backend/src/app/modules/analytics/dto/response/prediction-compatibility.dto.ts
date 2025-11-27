import { Expose } from 'class-transformer';
import { EPredictionVerdict } from '@prisma/client';
import { PredictionFlagsDto } from './prediction-flags.dto';

export class PredictionResponseDto extends PredictionFlagsDto{
    @Expose()
    gameId: string;

    @Expose()
    compatibilityScore: number;

    @Expose()
    verdict: EPredictionVerdict;

    constructor(data: {
		gameId: string,
		compabilityScore: number,
		verdict: EPredictionVerdict,
		greenFlags: Array<string>;
		redFlags: Array<string>;
	}) {
		super({
			greenFlags: data.greenFlags,
			redFlags: data.redFlags,
		})
		this.gameId = data.gameId;
		this.compatibilityScore = data.compabilityScore;
		this.verdict = data.verdict;
    }
}