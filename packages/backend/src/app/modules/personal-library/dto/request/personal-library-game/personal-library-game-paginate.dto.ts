import { BasePaginateDto } from '../../../../../shared/dto/response/pagination/base-paginate.dto';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

@Exclude()
export class PersonalLibraryGamePaginateDto extends BasePaginateDto {
	@IsInt()
	@Min(1)
	@IsOptional()
	@Expose()
	override page: number;

	@IsInt()
	@Min(1)
	@IsOptional()
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

