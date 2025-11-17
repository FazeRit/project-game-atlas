import { User } from "@prisma/client";
import { IReadRepository } from "../../../../../shared/repositories/iread.repository"

export abstract class IUserReadRepository extends IReadRepository<User>{}