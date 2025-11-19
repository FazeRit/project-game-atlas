import { Genre } from '@prisma/client';
import { GenreCreateDto } from '../../../../dto/request/genres/genre-create.dto';
import { GenreUpdateDto } from '../../../../dto/request/genres/genre-update.dto';
import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';

export abstract class IGenreWriteRepository extends IWriteRepository<Genre, GenreCreateDto, GenreUpdateDto> {}

