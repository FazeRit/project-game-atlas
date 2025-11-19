import { Cover } from '@prisma/client';
import { CoverCreateDto } from '../../../dto/request/covers/cover-create.dto';
import { CoverUpdateDto } from '../../../dto/request/covers/cover-update.dto';
import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';

export abstract class ICoverWriteRepository extends IWriteRepository<Cover, CoverCreateDto, CoverUpdateDto>{}