import { EPersonalLibraryGameRank } from "@/entities/personal-library-game/model/enums";

export interface IRankingsItemProps {
    id: string;
    index: number;
    title: string;
    parent: EPersonalLibraryGameRank;
    coverUrl: string;
}