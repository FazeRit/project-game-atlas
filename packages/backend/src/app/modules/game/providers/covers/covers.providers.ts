import { CoverWriteRepository } from '../../repositories/covers/implementations/cover-write.repository';
import { ICoverWriteRepository } from '../../repositories/covers/abstracts/icover-write.repository';
import { Provider } from '@nestjs/common';

export const COVERS_PROVIDERS: Array<Provider> = [
	{
		provide: ICoverWriteRepository,
		useClass: CoverWriteRepository,
	},
]

