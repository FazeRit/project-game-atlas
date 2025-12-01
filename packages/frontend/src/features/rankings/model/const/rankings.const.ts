import { EPersonalLibraryGameRank } from "@/entities/personal-library-game/model/enums";

export const rankingsLabel: Record<EPersonalLibraryGameRank, string> = {
    [EPersonalLibraryGameRank.A]: 'Відмінно',
    [EPersonalLibraryGameRank.B]: 'Добре',
    [EPersonalLibraryGameRank.C]: 'Посередньо',
    [EPersonalLibraryGameRank.D]: 'Слабко',
    [EPersonalLibraryGameRank.UNRANKED]: 'Без оцінки',
}

export const rankOrder: Array<EPersonalLibraryGameRank> = [
    EPersonalLibraryGameRank.A, 
    EPersonalLibraryGameRank.B, 
    EPersonalLibraryGameRank.C, 
    EPersonalLibraryGameRank.D, 
    EPersonalLibraryGameRank.UNRANKED,
]