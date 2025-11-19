import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameCompanyUpdateDto {
	@Expose()
	gameId?: string;

	@Expose()
	companyId?: string;

	@Expose()
	developer?: boolean;

	@Expose()
	publisher?: boolean;

	@Expose()
	supporting?: boolean;

	constructor(partial: Partial<GameCompanyUpdateDto>) {
		Object.assign(this, partial);
	}
}

