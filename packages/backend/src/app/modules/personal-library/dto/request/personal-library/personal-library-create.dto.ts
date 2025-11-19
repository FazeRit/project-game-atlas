import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonalLibraryCreateDto {
	@Expose()
	userId: string;

	constructor(data: {
		userId: string;
	}) {
		this.userId = data.userId;
	}
}

