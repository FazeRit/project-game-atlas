import { EPersonalLibraryGameRank } from "@/entities/personal-library-game/model/enums";
import { IRankingsItemProps } from "../interfaces";

export type TTiersState = {
    [K in EPersonalLibraryGameRank]: Array<IRankingsItemProps>;
};