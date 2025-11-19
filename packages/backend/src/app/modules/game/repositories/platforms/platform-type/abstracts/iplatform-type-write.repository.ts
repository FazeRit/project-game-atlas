import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';
import { PlatformType } from '@prisma/client';
import { PlatformTypeCreateDto } from '../../../../dto/request/platform-type/platform-type-create.dto';
import { PlatformTypeUpdateDto } from '../../../../dto/request/platform-type/platform-type-update.dto';

export abstract class IPlatformTypeWriteRepository extends IWriteRepository<PlatformType, PlatformTypeCreateDto, PlatformTypeUpdateDto> {}

