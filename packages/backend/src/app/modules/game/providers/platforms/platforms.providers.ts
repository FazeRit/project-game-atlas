import { IPlatformWriteRepository } from '../../repositories/platforms/platform/abstracts/iplatform-write.repository';
import { PlatformWriteRepository } from '../../repositories/platforms/platform/implementations/platform-write.repository';
import { Provider } from '@nestjs/common';

export const PLATFORM_PROVIDERS: Array<Provider> = [
	{
		provide: IPlatformWriteRepository,
		useClass: PlatformWriteRepository,
	},
]