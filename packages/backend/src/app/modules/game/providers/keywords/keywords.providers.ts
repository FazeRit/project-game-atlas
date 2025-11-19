import { IKeywordReadRepository } from '../../repositories/keywords/keywords/abstracts/ikeyword-read.repository';
import { IKeywordWriteRepository } from '../../repositories/keywords/keywords/abstracts/ikeyword-write.repository';
import { KeywordReadRepository } from '../../repositories/keywords/keywords/implementations/keyword-read.repository';
import { KeywordReadService } from '../../services/keywords/keywords/keywords-read-service/keyword-read.service';
import { KeywordWriteRepository } from '../../repositories/keywords/keywords/implementations/keyword-write.repository';
import { KeywordWriteService } from '../../services/keywords/keywords/keywords-write-service/keyword-write.service';
import { Provider } from '@nestjs/common';

export const KEYWORDS_PROVIDERS: Array<Provider> = [
	{
		provide: IKeywordReadRepository,
		useClass: KeywordReadRepository,
	},
	{
		provide: IKeywordWriteRepository,
		useClass: KeywordWriteRepository,
	},
	KeywordReadService,
	KeywordWriteService,
]

