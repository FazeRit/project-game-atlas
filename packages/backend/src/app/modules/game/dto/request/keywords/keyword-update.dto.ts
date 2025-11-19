import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class KeywordUpdateDto {
	@Expose()
	name?: string;

	@Expose()
	slug?: string;

	@Expose()
	url?: string;

	constructor(partial: Partial<KeywordUpdateDto>) {
		Object.assign(this, partial);
	}
}

