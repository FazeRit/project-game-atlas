import { IReadRepository } from '../../../../../shared/repositories/iread.repository';
import { PersonalLibrary } from '@prisma/client';

export abstract class IPersonalLibraryReadRepository extends IReadRepository<PersonalLibrary> {
	abstract findByUserId(userId: string): Promise<PersonalLibrary | null>;
}

