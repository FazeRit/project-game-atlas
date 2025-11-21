import { EPlayStatus, ETierRank } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { GameDetailsResponseDto } from '../../../../game/dto/response/game/game-details.dto';
import { PersonalLibraryGameResponseDto } from './personal-library-game.dto';

@Exclude()
export class PersonalLibraryGameDetailsResponseDto extends PersonalLibraryGameResponseDto {
    @Expose()
    @Type(() => GameDetailsResponseDto)
    game: GameDetailsResponseDto;

    constructor(
        checksum: string,
        gameId: string,
        personalLibraryId: string,
        status: EPlayStatus,
        rank: ETierRank,
        createdAt: Date,
        updatedAt: Date,
        game: GameDetailsResponseDto,
        note?: string
    ) {
        super(
            checksum,
            gameId,
            personalLibraryId,
            status,
            rank,
            createdAt,
            updatedAt,
            note
        );

        this.game = game;
    }
}