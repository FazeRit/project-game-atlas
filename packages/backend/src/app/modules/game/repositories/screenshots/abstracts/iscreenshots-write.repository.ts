import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';
import { Screenshots } from '@prisma/client';
import { ScreenshotsCreateDto } from '../../../dto/request/screenshots/screenshots-create.dto';
import { ScreenshotsUpdateDto } from '../../../dto/request/screenshots/screenshots-update.dto';

export abstract class IScreenshotsWriteRepository extends IWriteRepository<Screenshots, ScreenshotsCreateDto, ScreenshotsUpdateDto> {}

