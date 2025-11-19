import { GameKeyword } from '@prisma/client';
import { GameKeywordCreateDto, GameKeywordUpdateDto } from '../../../../dto';
import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';

export abstract class IGameKeywordWriteRepository extends IWriteRepository<GameKeyword, GameKeywordCreateDto, GameKeywordUpdateDto> {}

