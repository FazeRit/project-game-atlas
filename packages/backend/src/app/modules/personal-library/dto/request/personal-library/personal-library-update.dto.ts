import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonalLibraryUpdateDto {
	@Expose()
	userId?: string;

	constructor(partial: Partial<PersonalLibraryUpdateDto>) {
		Object.assign(this, partial);
	}
}

