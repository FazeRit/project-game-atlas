import { User } from "@prisma/client";
import { IWriteRepository } from "../../../../../shared/repositories/iwrite.repository";
import { UserUpdateDto } from "../../../dto/response/user/user-update.dto";
import { UserCreateDto } from "../../../dto/response/user/user-create.dto";

export abstract class IUserWriteRepository extends IWriteRepository<User, UserCreateDto, UserUpdateDto>{}