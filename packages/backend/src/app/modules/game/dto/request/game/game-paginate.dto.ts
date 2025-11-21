import { BasePaginateDto } from '../../../../../shared/dto/response/pagination/base-paginate.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GamePaginateDto extends BasePaginateDto {
	@Expose()
	override page: number;

	@Expose()
	override limit: number;

	constructor(data?: {
		page?: number;
		limit?: number;
		searchQuery?: string;
	}) {
		super(data);

		this.page = data?.page ?? 1;
		this.limit = data?.limit ?? 10;
	}
}

