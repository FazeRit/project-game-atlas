import { GameCompanyReadRepository } from '../../repositories/companies/game-company/implementations/game-company-read.repository';
import { GameCompanyReadService } from '../../services/companies/game-company/game-company-read-service/game-company-read.service';
import { GameCompanyWriteRepository } from '../../repositories/companies/game-company/implementations';
import { GameCompanyWriteService } from '../../services/companies/game-company/game-company-write-service/game-company-write.service';
import { IGameCompanyReadRepository } from '../../repositories/companies/game-company/abstracts/igame-company-read.repository';
import { IGameCompanyWriteRepository } from '../../repositories/companies/game-company/abstracts';
import { Provider } from '@nestjs/common';

export const GAME_COMPANY_PROVIDERS: Array<Provider> = [
	{
		provide: IGameCompanyReadRepository,
		useClass: GameCompanyReadRepository,
	},
	{
		provide: IGameCompanyWriteRepository,
		useClass: GameCompanyWriteRepository,
	},
	GameCompanyReadService,
	GameCompanyWriteService,
]

