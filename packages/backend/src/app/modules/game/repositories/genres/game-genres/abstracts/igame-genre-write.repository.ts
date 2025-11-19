import { GameGenre } from '@prisma/client';
import { GameGenreCreateDto } from '../../../../dto/request/game-genre/game-genre-create.dto';
import { GameGenreUpdateDto } from '../../../../dto/request/game-genre/game-genre-update.dto';
import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';

export abstract class IGameGenreWriteRepository extends IWriteRepository<GameGenre, GameGenreCreateDto, GameGenreUpdateDto> {}

