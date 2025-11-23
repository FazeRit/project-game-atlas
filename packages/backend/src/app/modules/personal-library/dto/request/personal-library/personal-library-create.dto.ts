import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class PersonalLibraryCreateDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	userId!: string;
}

