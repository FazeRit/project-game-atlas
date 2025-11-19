import { IPlatformReadRepository } from '../../repositories/platforms/platform/abstracts/iplatform-read.repository';
import { IPlatformWriteRepository } from '../../repositories/platforms/platform/abstracts/iplatform-write.repository';
import { PlatformReadRepository } from '../../repositories/platforms/platform/implementations/platform-read.repository';
import { PlatformReadService } from '../../services/platforms/platform/platform-read-service/platform-read.service';
import { PlatformWriteRepository } from '../../repositories/platforms/platform/implementations/platform-write.repository';
import { PlatformWriteService } from '../../services/platforms/platform/platform-write-service/platform-write.service';
import { Provider } from '@nestjs/common';

export const PLATFORM_PROVIDERS: Array<Provider> = [
	{
		provide: IPlatformReadRepository,
		useClass: PlatformReadRepository,
	},
	{
		provide: IPlatformWriteRepository,
		useClass: PlatformWriteRepository,
	},
	PlatformReadService,
	PlatformWriteService,
]