import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { PersonalLibraryGameFiltersDto } from '../../../dto/request/personal-library-game/personal-library-game-filters.dto';
import { TPersonalLibraryGameWithDetails, TPaginatePersonalLibraryGameDto } from '../../../types/personal-library-game/personal-library-game-with-details.type';

export abstract class IPersonalLibraryGameReadRepository extends IReadRepository<TPersonalLibraryGameWithDetails> {
	abstract findAll(
		userId: string,
		page: number,
		limit: number,
		filters?: PersonalLibraryGameFiltersDto,
		search?: Record<string, unknown>,
		sort?: Record<string, unknown>
	): Promise<Array<TPaginatePersonalLibraryGameDto>>;
	abstract count(
		userId: string,
		filters?: PersonalLibraryGameFiltersDto,
		search?: Record<string, unknown>
	): Promise<number>;
	abstract exists(
		userId: string,
		gameId: string
	): Promise<boolean>;
	abstract findByUserIdAndGameId(userId: string, gameId: string): Promise<TPersonalLibraryGameWithDetails | null>;
}

