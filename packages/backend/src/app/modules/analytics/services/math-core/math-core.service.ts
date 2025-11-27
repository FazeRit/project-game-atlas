import { Injectable } from '@nestjs/common';

@Injectable()
export class MathCoreService {
    calculateSimilarity(
		firstVector: Record<string, number>,
		secondVector: Record<string, number>
    ): number {
        const allKeys = Array.from(new Set([
			...Object.keys(firstVector),
			...Object.keys(secondVector)
		]));

		const vecA = allKeys.map(key => {
			return firstVector[key] ?? 0
		})

		const vecB = allKeys.map(key => {
			return secondVector[key] ?? 0
		})

		const dotProduct = vecA.reduce(
			(sum, val, i) => sum + val * vecB[i], 0
		);

		const magnitudeA = Math.sqrt(
			vecA.reduce(
				(sum, val) => sum + val * val, 0
			)
		);
		const magnitudeB = Math.sqrt(
			vecB.reduce(
				(sum, val) => sum + val * val, 0
			)
		);

		if (magnitudeA === 0 || magnitudeB === 0) {
			return 0;
		}

		return dotProduct / (magnitudeA * magnitudeB);
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