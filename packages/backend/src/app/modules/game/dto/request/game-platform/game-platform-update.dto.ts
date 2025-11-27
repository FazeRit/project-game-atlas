import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class GamePlatformUpdateDto {
    @IsOptional()
    @IsString()
    @Expose()
    gameId?: string;

    @IsOptional()
    @IsString()
    @Expose()
    platformId?: string;

    constructor(partial: Partial<GamePlatformUpdateDto>) {
		Object.assign(this, partial);
	}
}