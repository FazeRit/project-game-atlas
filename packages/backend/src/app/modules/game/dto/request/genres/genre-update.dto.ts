import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GenreUpdateDto {
	@Expose()
	name?: string;

	@Expose()
	slug?: string;

	constructor(partial: Partial<GenreUpdateDto>) {
		Object.assign(this, partial);
	}
}

