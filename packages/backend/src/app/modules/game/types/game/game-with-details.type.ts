import { Prisma } from '@prisma/client';

export type GameWithDetails = Prisma.GameGetPayload<{
	include: {
		cover: true;
		screenshots: true;
		gameGenres: {
			include: {
				genre: true;
			};
		};
		gameKeywords: {
			include: {
				keyword: true;
			};
		};
		gameCompanies: {
			include: {
				company: true;
			};
		};
		gamePlatforms: {
			include: {
				platform: true;
			};
		};
	};
}>;

