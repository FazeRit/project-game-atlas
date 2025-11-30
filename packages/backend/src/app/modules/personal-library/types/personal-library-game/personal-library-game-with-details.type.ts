import { Prisma } from '@prisma/client';

export type TPersonalLibraryGameWithDetails = Prisma.PersonalLibraryGameGetPayload<{
	include: {
		game: {
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
			};
		};
	};
}>;

export type TPaginatePersonalLibraryGameDto = Prisma.PersonalLibraryGameGetPayload<{
	include: {
		game: {
			include: {
				cover: true;
				screenshots: true;
				gameGenres: {
					include: {
						genre: true;
					};
				};
			};
		};
	};
}>;
