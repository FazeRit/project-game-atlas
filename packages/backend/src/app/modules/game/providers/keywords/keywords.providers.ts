import { IKeywordReadRepository } from '../../repositories/keywords/keywords/abstracts/ikeyword-read.repository';
import { IKeywordWriteRepository } from '../../repositories/keywords/keywords/abstracts/ikeyword-write.repository';
import { KeywordReadRepository } from '../../repositories/keywords/keywords/implementations/keyword-read.repository';
import { KeywordWriteRepository } from '../../repositories/keywords/keywords/implementations/keyword-write.repository';
import { Provider } from '@nestjs/common';
import { KeywordsMapService } from '../../services/keywords/keywords/keywords-map-service/keywords-map.service';
import { KeywordsReadService } from '../../services/keywords/keywords/keywords-read-service/keywords-read.service';
import { KeywordsWriteService } from '../../services/keywords/keywords/keywords-write-service/keywords-write.service';

export const KEYWORDS_PROVIDERS: Array<Provider> = [
	{
		provide: IKeywordReadRepository,
		useClass: KeywordReadRepository,
	},
	{
		provide: IKeywordWriteRepository,
		useClass: KeywordWriteRepository,
	},
	KeywordsMapService,
	KeywordsReadService,
	KeywordsWriteService,
]

