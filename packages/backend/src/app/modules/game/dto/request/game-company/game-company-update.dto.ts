import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GameCompanyUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	gameId?: string;

	@IsOptional()
	@IsString()
	@Expose()
	companyId?: string;

	@IsOptional()
	@IsBoolean()
	@Expose()
	developer?: boolean;

	@IsOptional()
	@IsBoolean()
	@Expose()
	publisher?: boolean;

	@IsOptional()
	@IsBoolean()
	@Expose()
	supporting?: boolean;

	constructor(partial: Partial<GameCompanyUpdateDto>) {
		Object.assign(this, partial);
	}
}

