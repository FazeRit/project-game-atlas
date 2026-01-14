import { GameBattle } from '@prisma/client';
import { IGameBattleWriteRepository } from '../abstracts/igame-battles-write.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { GameBattleCreateDto, GameBattleUpdateDto } from '../../../dto/request/game-battle';

@Injectable()
export class GameBattleWriteRepository implements IGameBattleWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: GameBattleCreateDto): Promise<GameBattle | null> {
		return this.prisma.gameBattle.create({
			data
		});
	}

	async update(checksum: string, data: GameBattleUpdateDto): Promise<GameBattle | null> {
		return this.prisma.gameBattle.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.gameBattle.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<GameBattleCreateDto>): Promise<void> {
		await this.prisma.gameBattle.createMany({
			data,
			skipDuplicates: true
		});
	}

	async deactiveAllInactive(): Promise<void> {
		const now = new Date();

		await this.prisma.gameBattle.updateMany({
			where: {
				isActive: true,
				endsAt: {
					lt: now
				}
			},
			data: {
				isActive: false
			}
		})
	}
}