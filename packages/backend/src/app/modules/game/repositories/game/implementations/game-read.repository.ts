import { Game } from '@prisma/client';
import { IGameReadRepository } from '../abstracts/igame-read.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class GameReadRepository implements IGameReadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(checksum: string): Promise<Game | null> {
		return this.prisma.game.findUnique({
			where: {
				checksum
			}
		});
	}
}

