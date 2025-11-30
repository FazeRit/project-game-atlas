import { GameFiltersDto } from '../../../dto/request/game/game-filters.dto';
import { TGameWithDetails, TPaginateGameDto } from '../../../types/game/game.types';
import { IReadRepository } from '../../../../../shared/repositories/iread.repository';

export abstract class IGameReadRepository extends IReadRepository<TGameWithDetails> {
	abstract override findById(
		checksum: string,
		userId?: string
	): Promise<TGameWithDetails | null>;

	abstract findAll(
		page: number,
		limit: number,
		filters?: GameFiltersDto,
		search?: Record<string, unknown>,
		sort?: Record<string, unknown>
	): Promise<Array<TPaginateGameDto>>;

	abstract count(
		filters?: GameFiltersDto,
		search?: Record<string, unknown>
	): Promise<number>;
}