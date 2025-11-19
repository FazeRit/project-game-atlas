import { IKeywordReadRepository } from '../../repositories/keywords/keywords/abstracts/ikeyword-read.repository';
import { IKeywordWriteRepository } from '../../repositories/keywords/keywords/abstracts/ikeyword-write.repository';
import { KeywordReadRepository } from '../../repositories/keywords/keywords/implementations/keyword-read.repository';
import { KeywordWriteRepository } from '../../repositories/keywords/keywords/implementations/keyword-write.repository';
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
]

