import { EPersonalLibraryGameStatus } from "../enums";

export const personalLibraryGameStatusLabels: Record<EPersonalLibraryGameStatus, string> = {
    PREFERENCE: 'Вподобання', 
    PLAYING: 'Граю',
    COMPLETED: 'Пройдено',
    DROPPED: 'Закинуто',
    ON_HOLD: 'Відкладено',
    BACKLOG: 'Планується до проходження',
};