import { IUserReadRepository } from '../../repositories/user/abstracts/iuser-read.repository';
import { IUserWriteRepository } from '../../repositories/user/abstracts/iuser-write.repository';
import { Provider } from '@nestjs/common';
import { UserReadRepository } from '../../repositories/user/implementations/user-read.repository';
import { UserReadService } from '../../services/user/user-read-service/user-read.service';
import { UserWriteRepository } from '../../repositories/user/implementations/user-write.repository';
import { UserWriteService } from '../../services/user/user-write-service/user-write.service';

export const USER_PROVIDERS: Array<Provider> = [
	{
		provide: IUserReadRepository,
		useClass: UserReadRepository,
	},
	{
		provide: IUserWriteRepository,
		useClass: UserWriteRepository,
	},
	UserReadService,
	UserWriteService,
]