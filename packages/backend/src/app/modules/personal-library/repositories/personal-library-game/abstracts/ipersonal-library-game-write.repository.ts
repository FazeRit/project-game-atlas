import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';
import { PersonalLibraryGame } from '@prisma/client';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';

export abstract class IPersonalLibraryGameWriteRepository extends IWriteRepository<PersonalLibraryGame, PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto> {}