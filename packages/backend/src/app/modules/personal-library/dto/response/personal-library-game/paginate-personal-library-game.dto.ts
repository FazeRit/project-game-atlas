import { Exclude, Expose, Type } from 'class-transformer';
import { PaginateGameResponseDto } from '../../../../game/dto';
import { PersonalLibraryGameResponseDto } from './personal-library-game.dto';
import { EPlayStatus, ETierRank } from '@prisma/client';

@Exclude()
export class PaginatePersonalLibraryGameResponseDto extends PersonalLibraryGameResponseDto {
    @Expose()
    @Type(() => PaginateGameResponseDto)
    game: PaginateGameResponseDto;

    constructor(
        data: {
            checksum: string,
            gameId: string,
            personalLibraryId: string,
            status: EPlayStatus,
            rank: ETierRank,
            createdAt: Date,
            updatedAt: Date,
            note?: string,
            game: PaginateGameResponseDto
        }
    ) {
        super(data);
        this.game = data.game;
    }
}