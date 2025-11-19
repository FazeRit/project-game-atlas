import { IWriteRepository } from '../../../../../../shared/repositories/iwrite.repository';
import { Keyword } from '@prisma/client';
import { KeywordCreateDto, KeywordUpdateDto } from '../../../../dto';

export abstract class IKeywordWriteRepository extends IWriteRepository<Keyword, KeywordCreateDto, KeywordUpdateDto> {}

