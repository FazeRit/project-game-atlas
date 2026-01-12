import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IGameBattleReadRepository } from '../abstracts/igame-battles-read.repository';
import { GameBattle } from '@prisma/client';

@Injectable()
export class GameBattleReadRepository implements IGameBattleReadRepository {
	constructor(private readonly prisma: PrismaService) { }

	async findById(
		checksum: string,
	): Promise<GameBattle | null> {
		return this.prisma.gameBattle.findUnique({
			where: {
					checksum,
				}
			}
		);
	}

	async findActive(): Promise<GameBattle | null> {
		return this.prisma.gameBattle.findFirst({
			where: {
				isActive: true
			}
		})
	}
}