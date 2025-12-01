export interface IScreenshotResponse {
    checksum: string;
    gameId: string;
    imageId: string;
    height?: number;
    width?: number;
    url?: string;
    createdAt: Date;
    updatedAt: Date;
}