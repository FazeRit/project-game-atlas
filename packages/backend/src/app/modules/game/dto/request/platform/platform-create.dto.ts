import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class PlatformCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	platformTypeId: string;

	@IsOptional()
	@IsString()
	@Expose()
	abbreviation?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	name: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	alternativeName: string;

	@IsOptional()
	@IsString()
	@Expose()
	summary?: string;

	constructor(data: {
		checksum?: string;
		platformTypeId: string;
		abbreviation?: string;
		name: string;
		alternativeName: string;
		summary?: string;
	}) {
		this.checksum = data.checksum;
		this.platformTypeId = data.platformTypeId;
		this.abbreviation = data.abbreviation;
		this.name = data.name;
		this.alternativeName = data.alternativeName;
		this.summary = data.summary;
	}
}

