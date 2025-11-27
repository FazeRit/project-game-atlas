import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { PersonalLibraryGameFiltersDto } from '../../../dto/request/personal-library-game/personal-library-game-filters.dto';
import { PersonalLibraryGameWithDetails } from '../../../types/personal-library-game/personal-library-game-with-details.type';

export abstract class IPersonalLibraryGameReadRepository extends IReadRepository<PersonalLibraryGameWithDetails> {
	abstract findAll(
		userId: string,
		page: number,
		limit: number,
		filters?: PersonalLibraryGameFiltersDto,
		search?: Record<string, unknown>,
		sort?: Record<string, unknown>
	): Promise<Array<PersonalLibraryGameWithDetails>>;
	abstract findByUserIdAndGameId(userId: string, gameId: string): Promise<PersonalLibraryGameWithDetails | null>;
	abstract findByUserIdAndId(userId: string, checksum: string): Promise<PersonalLibraryGameWithDetails | null>;
}

