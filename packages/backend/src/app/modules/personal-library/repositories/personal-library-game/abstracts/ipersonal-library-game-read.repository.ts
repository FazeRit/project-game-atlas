import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { PersonalLibraryGame } from '@prisma/client';

export abstract class IPersonalLibraryGameReadRepository extends IReadRepository<PersonalLibraryGame> {
	abstract findByPersonalLibraryId(personalLibraryId: string): Promise<PersonalLibraryGame[]>;
}

