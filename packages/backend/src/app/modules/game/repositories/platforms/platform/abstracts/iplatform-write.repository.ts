import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';
import { Platform } from '@prisma/client';
import { PlatformCreateDto } from '../../../../dto/request/platform/platform-create.dto';
import { PlatformUpdateDto } from '../../../../dto/request/platform/platform-update.dto';

export abstract class IPlatformWriteRepository extends IWriteRepository<Platform, PlatformCreateDto, PlatformUpdateDto> {}

