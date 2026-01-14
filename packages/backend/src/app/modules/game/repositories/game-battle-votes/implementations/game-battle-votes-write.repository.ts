import { EBattleVoteSide, GameBattle, GameBattleVote } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IGameBattleVoteWriteRepository } from '../abstracts/igame-battle-votes-write.repository';
import { GameBattleVoteCreateDto, GameBattleVoteUpdateDto } from '../../../dto';
import { IGameBattleVoteInternalCreate } from '../../../interfaces/game-battle-votes/game-battle-votes.interfaces';

@Injectable()
export class GameBattleVoteWriteRepository implements IGameBattleVoteWriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: IGameBattleVoteInternalCreate): Promise<GameBattleVote | null> {
		return this.prisma.gameBattleVote.create({
			data
		});
	}

	async update(checksum: string, data: GameBattleVoteUpdateDto): Promise<GameBattleVote | null> {
		return this.prisma.gameBattleVote.update({
			where: {
				checksum
			},
			data
		});
	}

	async delete(checksum: string): Promise<void> {
		await this.prisma.gameBattleVote.delete({
			where: {
				checksum
			}
		});
	}

	async createMany(data: Array<IGameBattleVoteInternalCreate>): Promise<void> {
		await this.prisma.gameBattleVote.createMany({
			data,
			skipDuplicates: true
		});
	}

	async vote(
		userId: string,
		data: GameBattleVoteCreateDto
	): Promise<GameBattle> {
		const {
			battleId,
			side
		} = data;

		const updatedGameBattle = await this.prisma.$transaction(async (tx) => {
			const battle = await tx.gameBattle.findUnique({
				where: {
					checksum: data.battleId
				}
			});

			if (!battle?.isActive) {
				throw new Error(`Battle isn't active`);
			}

			await tx.gameBattleVote.create({
				data: {
					userId,
					battleId,
					side
				}
			})

			const voteSide = side === EBattleVoteSide.A ? 'votesA' : 'votesB';

			const updatedGameBattle = await tx.gameBattle.update({
				where: {
					checksum: battleId
				},
				data: {
					[voteSide]: {
						increment: 1
					}
				}
			})

			return updatedGameBattle;
		})

		return updatedGameBattle;
	}
}