import { Exclude, Expose } from 'class-transformer';
import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString
} from 'class-validator';

@Exclude()
export class GameCompanyCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	gameId: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	companyId: string;

	@IsBoolean()
	@Expose()
	developer: boolean;

	@IsBoolean()
	@Expose()
	publisher: boolean;

	@IsBoolean()
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

