import { BadRequestException, Injectable } from '@nestjs/common';
import { EPlayStatus, ETierRank, PersonalLibraryGame } from '@prisma/client';
import { HeuristicEngineService } from '../../../../analytics/services/heuristic-engine-service/heuristic-engine.service';
import { IPersonalLibraryGameWriteRepository } from '../../../repositories/personal-library-game/abstracts/ipersonal-library-game-write.repository';
import { PersonalLibraryGameCreateDto, PersonalLibraryGameUpdateDto } from '../../../dto';
import { PersonalLibraryGameReadService } from '../personal-library-game-read-service/personal-library-game-read.service';
import { PersonalLibraryReadService } from '../../personal-library/personal-library-read-service/personal-library-read.service';

@Injectable()
export class PersonalLibraryGameWriteService {
	constructor(
		private readonly personalLibraryGameReadService: PersonalLibraryGameReadService,
		private readonly personalLibraryGameWriteRepository: IPersonalLibraryGameWriteRepository,
		private readonly personalLibraryReadService: PersonalLibraryReadService,
		private readonly heuristicEngine: HeuristicEngineService,
	) {}

	async create(userId: string, data: PersonalLibraryGameCreateDto): Promise<PersonalLibraryGame> {
		if (!data.gameId) {
			throw new BadRequestException('gameId is required');
		}

		if (!data.personalLibraryId) {
			throw new BadRequestException('personalLibraryId is required');
		}

		const personalLibrary = await this.personalLibraryReadService.findByUserId(userId);

		if (!personalLibrary) {
			throw new BadRequestException('Personal library not found');
		}

		if (personalLibrary.checksum !== data.personalLibraryId) {
			throw new BadRequestException('Personal library does not belong to this user');
		}

		const personalLibraryGame = await this.personalLibraryGameWriteRepository.create(data);

		if (!personalLibraryGame) {
			throw new BadRequestException('Failed to create personal library game');
		}

		await this.heuristicEngine.processStatusUpdate(
            userId,
            personalLibraryGame.gameId,
            personalLibraryGame.status,
        );

		if (personalLibraryGame.rank && personalLibraryGame.rank !== ETierRank.UNRANKED) {
            await this.heuristicEngine.processRankUpdate(
                userId,
                personalLibraryGame.gameId,
                personalLibraryGame.rank,
            );
        }

		return personalLibraryGame;
	}

	async update(userId: string, data: PersonalLibraryGameUpdateDto): Promise<PersonalLibraryGame> {
		if (!data.gameId) {
			throw new BadRequestException('gameId is required');
		}

		const existingPersonalLibraryGame = await this.personalLibraryGameReadService.findByUserIdAndGameId(userId, data.gameId);

		if (!existingPersonalLibraryGame) {
			throw new BadRequestException('Personal library game not found');
		}

		const oldStatus = existingPersonalLibraryGame.status;
        const oldRank = existingPersonalLibraryGame.rank;

		const updatedPersonalLibraryGame = await this.personalLibraryGameWriteRepository.update(existingPersonalLibraryGame.checksum, data);

		if (!updatedPersonalLibraryGame) {
			throw new BadRequestException('Failed to update personal library game');
		}

		if (data.status && data.status !== oldStatus) {
            await this.heuristicEngine.processStatusUpdate(
                userId,
                data.gameId,
                data.status,
                oldStatus
            );
        }

        if (data.rank && data.rank !== oldRank) {
            await this.heuristicEngine.processRankUpdate(
                userId,
                data.gameId,
                data.rank,
                oldRank
            );
        }

		return updatedPersonalLibraryGame;
	}

	async delete(userId: string, checksum: string): Promise<void> {
		const existingPersonalLibraryGame = await this.personalLibraryGameReadService.findByUserIdAndId(userId, checksum);

		if (!existingPersonalLibraryGame) {
			throw new BadRequestException('Personal library game not found');
		}

		const oldStatus = existingPersonalLibraryGame.status;
        const oldRank = existingPersonalLibraryGame.rank;
        const gameId = existingPersonalLibraryGame.gameId;

		await this.personalLibraryGameWriteRepository.delete(checksum);

		await this.heuristicEngine.processStatusUpdate(
            userId,
            gameId,
            EPlayStatus.ON_HOLD,
            oldStatus
        );

        if (oldRank !== 'UNRANKED') {
            await this.heuristicEngine.processRankUpdate(
                userId,
                gameId,
                ETierRank.UNRANKED,
                oldRank
            );
        }
	}
}

