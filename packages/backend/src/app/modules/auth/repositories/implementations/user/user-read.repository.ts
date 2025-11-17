import { User } from "@prisma/client";
import { PrismaService } from "../../../../prisma/prisma.service";
import { IUserReadRepository } from "../../abstracts/user/iuser-read.repository";

export class UserReadRepository implements IUserReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				checksum
			}
		})
	}
}