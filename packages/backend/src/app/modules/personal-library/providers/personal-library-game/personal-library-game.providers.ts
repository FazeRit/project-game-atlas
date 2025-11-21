import { IPersonalLibraryGameReadRepository } from '../../repositories/personal-library-game/abstracts/ipersonal-library-game-read.repository';
import { IPersonalLibraryGameWriteRepository } from '../../repositories/personal-library-game/abstracts/ipersonal-library-game-write.repository';
import { PersonalLibraryGameMapService } from '../../services/personal-library-game/personal-library-game-map-service/personal-library-game-map.service';
import { PersonalLibraryGameReadRepository } from '../../repositories/personal-library-game/implementations/personal-library-game-read.repository';
import { PersonalLibraryGameWriteRepository } from '../../repositories/personal-library-game/implementations/personal-library-game-write.repository';
import { Provider } from '@nestjs/common';

export const PERSONAL_LIBRARY_GAME_PROVIDERS: Array<Provider> = [
	{
		provide: IPersonalLibraryGameReadRepository,
		useClass: PersonalLibraryGameReadRepository,
	},
	{
		provide: IPersonalLibraryGameWriteRepository,
		useClass: PersonalLibraryGameWriteRepository,
	},
	PersonalLibraryGameMapService,
]

