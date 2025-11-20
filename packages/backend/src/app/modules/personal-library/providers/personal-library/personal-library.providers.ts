import { IPersonalLibraryReadRepository } from '../../repositories/personal-library/abstracts/ipersonal-library-read.repository';
import { IPersonalLibraryWriteRepository } from '../../repositories/personal-library/abstracts/ipersonal-library-write.repository';
import { PersonalLibraryReadRepository } from '../../repositories/personal-library/implementations/personal-library-read.repository';
import { PersonalLibraryWriteRepository } from '../../repositories/personal-library/implementations/personal-library-write.repository';
import { Provider } from '@nestjs/common';

export const PERSONAL_LIBRARY_PROVIDERS: Array<Provider> = [
	{
		provide: IPersonalLibraryReadRepository,
		useClass: PersonalLibraryReadRepository,
	},
	{
		provide: IPersonalLibraryWriteRepository,
		useClass: PersonalLibraryWriteRepository,
	}
]

