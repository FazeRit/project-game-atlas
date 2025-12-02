import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonalLibraryCreateDto {
	@Expose()
	userId: string;

	constructor(
		userId: string,
	) {
		this.userId = userId;
	}
}

