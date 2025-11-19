import { IScreenshotsReadRepository } from '../../repositories/screenshots/abstracts/iscreenshots-read.repository';
import { IScreenshotsWriteRepository } from '../../repositories/screenshots/abstracts/iscreenshots-write.repository';
import { Provider } from '@nestjs/common';
import { ScreenshotsReadRepository } from '../../repositories/screenshots/implementations/screenshots-read.repository';
import { ScreenshotsReadService } from '../../services/screenshots/screenshots-read-service/screenshots-read.service';
import { ScreenshotsWriteRepository } from '../../repositories/screenshots/implementations/screenshots-write.repository';
import { ScreenshotsWriteService } from '../../services/screenshots/screenshots-write-service/screenshots-write.service';

export const SCREENSHOTS_PROVIDERS: Array<Provider> = [
	{
		provide: IScreenshotsReadRepository,
		useClass: ScreenshotsReadRepository,
	},
	{
		provide: IScreenshotsWriteRepository,
		useClass: ScreenshotsWriteRepository,
	},
	ScreenshotsReadService,
	ScreenshotsWriteService,
]

