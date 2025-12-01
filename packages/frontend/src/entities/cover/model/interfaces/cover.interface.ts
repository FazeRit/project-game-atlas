export interface ICoverResponse {
    checksum: string;
    gameId: string;
    imageId: string;
    height: number;
    width: number;
    url?: string;
    createdAt: Date;
    updatedAt: Date;
}