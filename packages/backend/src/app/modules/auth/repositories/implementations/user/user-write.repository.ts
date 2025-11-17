import { User } from "@prisma/client";
import { UserCreateDto } from "../../../dto/response/user/user-create.dto";
import { IUserWriteRepository } from "../../abstracts/user/iuser-write.repository";
import { PrismaService } from "../../../../prisma/prisma.service";
import { UserUpdateDto } from "../../../dto/response/user/user-update.dto";

export class UserWriteRepository implements IUserWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: UserCreateDto): Promise<User | null> {
		return this.prisma.user.create({
			data
		});
	}

	async update(checksum: string, data: UserUpdateDto): Promise<User | null> {
		return this.prisma.user.update({
			where: {
				checksum
			},
			data
		})
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.user.delete({
			where: {
				checksum
			}
		})
	}
}