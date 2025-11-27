import { Injectable } from '@nestjs/common';
import { IPersonalLibraryGameReadRepository } from '../abstracts/ipersonal-library-game-read.repository';
import { PersonalLibraryGameFiltersDto } from '../../../dto/request/personal-library-game/personal-library-game-filters.dto';
import { PersonalLibraryGameWhereBuilder } from '../../../utils/personal-library-game-where-builder.util';
import { PersonalLibraryGameWithDetails } from '../../../types/personal-library-game/personal-library-game-with-details.type';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PersonalLibraryGameReadRepository implements IPersonalLibraryGameReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<PersonalLibraryGameWithDetails | null> {
		return this.prisma.personalLibraryGame.findUnique({
			where: {
				checksum
			},
			include: {
				game: {
					include: {
						cover: true,
						screenshots: true,
						gameGenres: {
							include: {
								genre: true
							}
						},
						gameKeywords: {
							include: {
								keyword: true
							}
						},
						gameCompanies: {
							include: {
								company: true
							}
						},
						gamePlatforms: {
							include: {
								platform: true
							}
						},
					}
				}
			},
		});
	}

	async findAll(
		userId: string,
		page: number,
		limit: number,
		filters?: PersonalLibraryGameFiltersDto,
		search?: Record<string, unknown>,
		sort?: Record<string, unknown>
	): Promise<Array<PersonalLibraryGameWithDetails>> {
		const where = PersonalLibraryGameWhereBuilder.build(
			userId,
			filters,
			search
		);

		const skip = (page - 1) * limit;

		return this.prisma.personalLibraryGame.findMany({
			where,
			include: {
				game: {
					include: {
						cover: true,
						screenshots: true,
						gameGenres: {
							include: {
								genre: true
							}
						},
						gameKeywords: {
							include: {
								keyword: true
							}
						},
						gameCompanies: {
							include: {
								company: true
							}
						},
						gamePlatforms: {
							include: {
								platform: true
							}
						},
					}
				}
			},
			skip,
			take: limit,
			...(sort && { orderBy: sort }),
		});
	}

	async findByUserIdAndGameId(userId: string, gameId: string): Promise<PersonalLibraryGameWithDetails | null> {
		return this.prisma.personalLibraryGame.findFirst({
			where: {
				gameId,
				personalLibrary: {
					userId
				}
			},
			include: {
				game: {
					include: {
						cover: true,
						screenshots: true,
						gameGenres: {
							include: {
								genre: true
							}
						},
						gameKeywords: {
							include: {
								keyword: true
							}
						},
						gameCompanies: {
							include: {
								company: true
							}
						},
						gamePlatforms: {
							include: {
								platform: true
							}
						},
					}
				}
			},
		});
	}

	async findByUserIdAndId(userId: string, checksum: string): Promise<PersonalLibraryGameWithDetails | null> {
		return this.prisma.personalLibraryGame.findFirst({
			where: {
				checksum,
				personalLibrary: {
					userId
				}
			},
			include: {
				game: {
					include: {
						cover: true,
						screenshots: true,
						gameGenres: {
							include: {
								genre: true
							}
						},
						gameKeywords: {
							include: {
								keyword: true
							}
						},
						gameCompanies: {
							include: {
								company: true
							}
						},
						gamePlatforms: {
							include: {
								platform: true
							}
						},
					}
				}
			},
		});
	}
}

