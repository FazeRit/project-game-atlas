import { Game } from '@prisma/client';
import { GameCreateDto } from '../../../dto/request/game/game-create.dto';
import { GameUpdateDto } from '../../../dto/request/game/game-update.dto';
import { IWriteRepository } from '../../../../../shared/repositories/iwrite.repository';

export abstract class IGameWriteRepository extends IWriteRepository<Game, GameCreateDto, GameUpdateDto> {}

