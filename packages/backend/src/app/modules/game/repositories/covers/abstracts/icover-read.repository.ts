import { Cover } from "@prisma/client";
import { IReadRepository } from "../../../../../shared/repositories/iread.repository"

export abstract class ICoverReadRepository extends IReadRepository<Cover>{}