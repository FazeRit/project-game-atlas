import { EPersonalLibraryGameRank } from "@/entities/personal-library-game/model/enums";
import { IRankingsItemProps } from "./rankings-item.interface";

export interface IRankingsRowProps {
    tierRank: EPersonalLibraryGameRank;
    items: Array<IRankingsItemProps>;
}