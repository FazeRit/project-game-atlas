import { IPlatformTypeReadRepository } from '../../repositories/platforms/platform-type/abstracts/iplatform-type-read.repository';
import { IPlatformTypeWriteRepository } from '../../repositories/platforms/platform-type/abstracts/iplatform-type-write.repository';
import { PlatformTypeReadRepository } from '../../repositories/platforms/platform-type/implementations/platform-type-read.repository';
import { PlatformTypeReadService } from '../../services/platforms/platform-type/platform-type-read-service/platform-type-read.service';
import { PlatformTypeWriteRepository } from '../../repositories/platforms/platform-type/implementations/platform-type-write.repository';
import { PlatformTypeWriteService } from '../../services/platforms/platform-type/platform-type-write-service/platform-type-write.service';
import { Provider } from '@nestjs/common';

export const PLATFORM_TYPES_PROVIDERS: Array<Provider> = [
	{
		provide: IPlatformTypeReadRepository,
		useClass: PlatformTypeReadRepository,
	},
	{
		provide: IPlatformTypeWriteRepository,
		useClass: PlatformTypeWriteRepository,
	},
	PlatformTypeReadService,
	PlatformTypeWriteService,
]