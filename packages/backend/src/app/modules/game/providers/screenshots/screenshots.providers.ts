import { IScreenshotsWriteRepository } from '../../repositories/screenshots/abstracts/iscreenshots-write.repository';
import { Provider } from '@nestjs/common';
import { ScreenshotsWriteRepository } from '../../repositories/screenshots/implementations/screenshots-write.repository';

export const SCREENSHOTS_PROVIDERS: Array<Provider> = [
	{
		provide: IScreenshotsWriteRepository,
		useClass: ScreenshotsWriteRepository,
	},
]

