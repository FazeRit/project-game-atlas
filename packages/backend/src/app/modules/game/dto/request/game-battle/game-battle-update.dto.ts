import { Expose } from 'class-transformer';
import { IsBoolean, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class GameBattleUpdateDto {
    @Expose()
    @IsOptional()
    @IsUUID('4')
    gameAId?: string;

    @Expose()
    @IsOptional()
    @IsUUID('4')
    gameBId?: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    endsAt?: Date;

    @Expose()
    @IsBoolean()
    isActive?: boolean;

    constructor(data: Partial<GameBattleUpdateDto>) {
        Object.assign(this, data);
    }
}