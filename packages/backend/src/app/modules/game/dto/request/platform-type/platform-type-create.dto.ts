import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class PlatformTypeCreateDto {
	@IsOptional()
	@IsString()
	@Expose()
	checksum?: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	name: string;

	constructor(data: {
		checksum?: string;
		name: string;
	}) {
		this.checksum = data.checksum;
		this.name = data.name;
	}
}

