import { Injectable } from '@nestjs/common';

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
}