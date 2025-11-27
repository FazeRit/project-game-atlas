import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class PersonalLibraryUpdateDto {
	@IsOptional()
	@IsString()
	@Expose()
	userId?: string;

	constructor(partial: Partial<PersonalLibraryUpdateDto>) {
		Object.assign(this, partial);
	}
}

