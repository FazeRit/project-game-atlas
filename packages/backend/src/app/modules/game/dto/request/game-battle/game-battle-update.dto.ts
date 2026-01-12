import { IsBoolean, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class GameBattleUpdateDto {
    @IsOptional()
    @IsUUID('4')
    gameAId?: string;

    @IsOptional()
    @IsUUID('4')
    gameBId?: string;

    @IsOptional()
    @IsDateString()
    endsAt?: Date;

    @IsBoolean()
    isActive?: boolean;

    constructor(data: Partial<GameBattleUpdateDto>) {
        Object.assign(this, data);
    }
}