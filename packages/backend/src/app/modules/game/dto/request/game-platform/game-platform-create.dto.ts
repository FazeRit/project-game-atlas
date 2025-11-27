export class GamePlatformCreateDto {
    gameId: string;
    platformId: string;

    constructor(dto: GamePlatformCreateDto) {
        this.gameId = dto.gameId;
        this.platformId = dto.platformId;
    }
}