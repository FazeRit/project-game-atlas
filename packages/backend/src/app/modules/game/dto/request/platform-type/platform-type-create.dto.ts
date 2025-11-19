import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlatformTypeCreateDto {
	@Expose()
	checksum?: string;

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

