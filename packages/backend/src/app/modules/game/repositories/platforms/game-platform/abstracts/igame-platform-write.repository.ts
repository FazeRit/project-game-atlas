import { GamePlatform } from '@prisma/client';
import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';
import { GamePlatformCreateDto } from '../../../../dto/request/game-platform/game-platform-create.dto';
import { GamePlatformUpdateDto } from '../../../../dto/request/game-platform/game-platform-update.dto';

export abstract class IGamePlatformWriteRepository extends IWriteRepository<GamePlatform, GamePlatformCreateDto, GamePlatformUpdateDto> {}

