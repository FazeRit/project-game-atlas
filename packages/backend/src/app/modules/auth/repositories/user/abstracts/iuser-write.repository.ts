import { User } from "@prisma/client";
import { IWriteRepository } from "../../../../../shared/repositories/iwrite.repository";
import { UserUpdateDto } from "../../../dto/request/user/user-update.dto";
import { UserCreateDto } from "../../../dto/request/user/user-create.dto";

export abstract class IUserWriteRepository extends IWriteRepository<User, UserCreateDto, UserUpdateDto>{
    abstract updateByEmail(email: string, data: UserUpdateDto): Promise<User>
}