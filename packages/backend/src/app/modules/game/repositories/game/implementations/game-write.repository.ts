import { Game } from '@prisma/client';
import { GameCreateDto } from '../../../dto/request/game/game-create.dto';
import { GameUpdateDto } from '../../../dto/request/game/game-update.dto';
import { IGameWriteRepository } from '../abstracts/igame-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class GameWriteRepository implements IGameWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: GameCreateDto): Promise<Game | null> {
		return this.prisma.game.create({
			data
		});
	}

	async update(checksum: string, data: GameUpdateDto): Promise<Game | null> {
		return this.prisma.game.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.game.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<GameCreateDto>): Promise<void> {
		await this.prisma.game.createMany({
			data,
			skipDuplicates: true
		});
	}
}

