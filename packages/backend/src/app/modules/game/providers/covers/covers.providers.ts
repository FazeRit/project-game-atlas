import { CoverReadRepository } from '../../repositories/covers/implementations/cover-read.repository';
import { CoversReadService } from '../../services/covers/covers-read-service/covers-read.service';
import { CoversWriteService } from '../../services/covers/covers-write-service/covers-write.service';
import { CoverWriteRepository } from '../../repositories/covers/implementations/cover-write.repository';
import { ICoverReadRepository } from '../../repositories/covers/abstracts/icover-read.repository';
import { ICoverWriteRepository } from '../../repositories/covers/abstracts/icover-write.repository';
import { Provider } from '@nestjs/common';

export const COVERS_PROVIDERS: Array<Provider> = [
	{
		provide: ICoverReadRepository,
		useClass: CoverReadRepository,
	},
	{
		provide: ICoverWriteRepository,
		useClass: CoverWriteRepository,
	},
	CoversReadService,
	CoversWriteService,
]

