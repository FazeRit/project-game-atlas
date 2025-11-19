import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlatformTypeUpdateDto {
	@Expose()
	name?: string;

	constructor(partial: Partial<PlatformTypeUpdateDto>) {
		Object.assign(this, partial);
	}
}

