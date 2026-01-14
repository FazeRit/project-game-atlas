import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { GameBattleVote } from '@prisma/client';
import { IGameBattleVoteReadRepository } from '../abstracts/igame-battle-votes-read.repository';

@Injectable()
export class GameBattleVoteReadRepository implements IGameBattleVoteReadRepository {
	constructor(private readonly prisma: PrismaService) { }

	async findById(checksum: string): Promise<GameBattleVote | null> {
		return this.prisma.gameBattleVote.findUnique({
			where: {
					checksum,
				}
			}
		);
	}

	async findByUserAndBattle(userId: string, battleId: string): Promise<GameBattleVote | null> {
		return this.prisma.gameBattleVote.findUnique({
			where: {
				userId_battleId: {
					userId,
					battleId
				}
			}
		})
	}
}