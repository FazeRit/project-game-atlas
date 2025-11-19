import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';
import { PersonalLibrary } from '@prisma/client';
import { PersonalLibraryCreateDto, PersonalLibraryUpdateDto } from '../../../dto';

export abstract class IPersonalLibraryWriteRepository extends IWriteRepository<PersonalLibrary, PersonalLibraryCreateDto, PersonalLibraryUpdateDto> {}