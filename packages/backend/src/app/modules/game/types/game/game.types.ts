import { Prisma } from '@prisma/client';

export type TGameWithDetails = Prisma.GameGetPayload<{
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
		personalLibraryGames: true;
	};
}>;


export type TPaginateGameDto = Prisma.GameGetPayload<{
	include: {
		cover: true;
		gameGenres: {
			include: {
				genre: true;
			};
		};
	};
}>;