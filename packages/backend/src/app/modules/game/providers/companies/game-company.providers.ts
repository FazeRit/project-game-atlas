import { GameCompanyWriteRepository } from '../../repositories/companies/game-company/implementations';
import { IGameCompanyWriteRepository } from '../../repositories/companies/game-company/abstracts';
import { Provider } from '@nestjs/common';

export const GAME_COMPANY_PROVIDERS: Array<Provider> = [
	{
		provide: IGameCompanyWriteRepository,
		useClass: GameCompanyWriteRepository,
	},
]

