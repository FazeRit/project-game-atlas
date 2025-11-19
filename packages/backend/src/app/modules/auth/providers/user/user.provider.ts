import { Provider } from "@nestjs/common";
import { IUserReadRepository } from "../../repositories/user/abstracts/iuser-read.repository";
import { UserReadRepository } from "../../repositories/user/implementations/user-read.repository";
import { IUserWriteRepository } from "../../repositories/user/abstracts/iuser-write.repository";
import { UserWriteRepository } from "../../repositories/user/implementations/user-write.repository";

export const USER_PROVIDERS: Array<Provider> = [
	{
		provide: IUserReadRepository,
		useClass: UserReadRepository,
	},
	{
		provide: IUserWriteRepository,
		useClass: UserWriteRepository,
	}
]