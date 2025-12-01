import { IPaginatePersonalLibraryGameResponse } from "@/entities";
import { EPersonalLibraryGameRank } from "@/entities/personal-library-game/model/enums";
import { TTiersState } from "../types";

export const groupGamesByRank = (
    games: IPaginatePersonalLibraryGameResponse[] | undefined,
    rankOrder: EPersonalLibraryGameRank[]
): TTiersState => {
    const tiers = rankOrder.reduce((acc, rank) => {
        acc[rank as keyof TTiersState] = [];
        return acc;
    }, {} as TTiersState);

    games?.forEach((game: IPaginatePersonalLibraryGameResponse) => {
        const rank = (game.rank as EPersonalLibraryGameRank) || EPersonalLibraryGameRank.UNRANKED;
        
        if (!game.game.name || !game.game.cover?.url) return; 

        tiers[rank as keyof TTiersState].push({
            title: game.game.name,
            id: game.game.checksum,
            index: 0, 
            parent: rank,
            coverUrl: game.game.cover.url,
        });
    });

    return tiers;
};