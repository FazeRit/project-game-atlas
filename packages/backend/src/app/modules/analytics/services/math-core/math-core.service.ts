import { Injectable } from '@nestjs/common';
import { MatchResponseDto } from '../../dto';

@Injectable()
export class MathCoreService {
    calculateSimilarity(
		sourceVector: Record<string, number>, 
        targetVector: Record<string, number>
    ): number {
        const sourceKeys = Object.keys(sourceVector);

        if (sourceKeys.length === 0) return 0;

        let dotProduct = 0;
        let sourceMagnitudeSq = 0;
        let targetMagnitudeSq = 0;

        for (const key of sourceKeys) {
            const sourceVal = sourceVector[key] ?? 0;
            const targetVal = targetVector[key] ?? 0;

            dotProduct += sourceVal * targetVal;
            sourceMagnitudeSq += sourceVal * sourceVal;
            targetMagnitudeSq += targetVal * targetVal;
        }

        const sourceMagnitude = Math.sqrt(sourceMagnitudeSq);
        const targetMagnitude = Math.sqrt(targetMagnitudeSq);

        if (sourceMagnitude === 0 || targetMagnitude === 0) {
            return 0;
        }

        return dotProduct / (sourceMagnitude * targetMagnitude);
	}

	mergeVector(
		firstVector: Record<string, number>,
		secondVector: Record<string, number>
	): Record<string, number> {
		const allKeys = Array.from(new Set([
			...Object.keys(firstVector),
			...Object.keys(secondVector)
		]));
	
		const result: Record<string, number> = {};

		allKeys.forEach(key => {
			const oldValue = firstVector[key] ?? 0;
			const newValue = secondVector[key] ?? 0;

			result[key] = oldValue + newValue;
		});
	
		return result;
	}

	invertVector(vector: Record<string, number>): Record<string, number> {
		return Object.fromEntries(
			Object.entries(vector).map(
				([key, value]) => [key, -value]
			)
		);
	}

	public findNearestNeighbor<T extends { tasteVector: Record<string, number> }>(
        targetVector: Record<string, number>,
        candidates: T[],
        mode: 'nearest' | 'furthest' = 'nearest'
    ): MatchResponseDto<T> | null {
        if (!candidates.length) return null;

        let bestMatch: T | null = null;
        let bestScore = mode === 'nearest' ? -2 : 2; 

        for (const candidate of candidates) {
            const score = this.calculateSimilarity(targetVector, candidate.tasteVector);

            const isBetter = mode === 'nearest' 
                ? score > bestScore 
                : score < bestScore;

            if (isBetter) {
                bestScore = score;
                bestMatch = candidate;
            }
        }

        return bestMatch ? {
            item: bestMatch,
            score: bestScore
        } : null;
    }
}