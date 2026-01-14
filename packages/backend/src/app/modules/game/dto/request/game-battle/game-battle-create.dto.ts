import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GameBattleCreateDto {
    @Expose()
    @IsNotEmpty()
    @IsUUID('4')
    gameAId: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID('4')
    gameBId: string;

    @Expose()
    @IsNotEmpty()
    @IsDateString()
    endsAt: Date;

    @Expose()
    @IsOptional()
    isActive?: boolean;

    constructor(
        gameAId: string,
        gameBId: string,
        endsAt: Date,
        isActive: boolean
    ) {
        this.gameAId = gameAId;
        this.gameBId = gameBId;
        this.endsAt = endsAt;
        this.isActive = isActive;
    }
}