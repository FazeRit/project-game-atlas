import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GameBattleCreateDto {
    @IsNotEmpty()
    @IsUUID('4')
    gameAId: string;

    @IsNotEmpty()
    @IsUUID('4')
    gameBId: string;

    @IsNotEmpty()
    @IsDateString()
    endsAt: Date;

    @IsOptional()
    isActive?: boolean;

    constructor(data: {
        gameAId: string;
        gameBId: string;
        endsAt: Date;
        isActive: boolean;
    }) {
        this.gameAId = data.gameAId;
        this.gameBId = data.gameBId;
        this.endsAt = data.endsAt;
        this.isActive = data.isActive;
    }
}