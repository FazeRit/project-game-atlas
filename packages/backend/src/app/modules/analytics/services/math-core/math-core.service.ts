import { Injectable } from '@nestjs/common';

@Injectable()
export class MathCoreService {
    calculateSimilarity(
        userVector: Record<string, number>,
        gameVector: Record<string, number>
    ): number {
        const allKeys = Array.from(new Set([
			...Object.keys(userVector),
			...Object.keys(gameVector)
		]));

		const vecA = allKeys.map(key => {
			return userVector[key] ?? 0
		})

		const vecB = allKeys.map(key => {
			return gameVector[key] ?? 0
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

	mergeVector(oldVector: Record<string, number>, newVector: Record<string, number>): Record<string, number> {
		const allKeys = Array.from(new Set([
			...Object.keys(oldVector),
			...Object.keys(newVector)
		]));
	
		const result: Record<string, number> = {};

		allKeys.forEach(key => {
			const oldValue = oldVector[key] ?? 0;
			const newValue = newVector[key] ?? 0;

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