import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameCompanyCreateDto {
	@Expose()
	checksum?: string;

	@Expose()
	gameId: string;

	@Expose()
	companyId: string;

	@Expose()
	developer: boolean;

	@Expose()
	publisher: boolean;

	@Expose()
	supporting: boolean;

	constructor(data: {
		checksum?: string;
		gameId: string;
		companyId: string;
		developer: boolean;
		publisher: boolean;
		supporting: boolean;
	}) {
		this.checksum = data.checksum;
		this.gameId = data.gameId;
		this.companyId = data.companyId;
		this.developer = data.developer;
		this.publisher = data.publisher;
		this.supporting = data.supporting;
	}
}

