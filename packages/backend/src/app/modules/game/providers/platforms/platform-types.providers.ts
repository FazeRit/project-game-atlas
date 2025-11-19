import { IPlatformTypeWriteRepository } from '../../repositories/platforms/platform-type/abstracts/iplatform-type-write.repository';
import { PlatformTypeWriteRepository } from '../../repositories/platforms/platform-type/implementations/platform-type-write.repository';
import { Provider } from '@nestjs/common';

export const PLATFORM_TYPES_PROVIDERS: Array<Provider> = [
	{
		provide: IPlatformTypeWriteRepository,
		useClass: PlatformTypeWriteRepository,
	},
]