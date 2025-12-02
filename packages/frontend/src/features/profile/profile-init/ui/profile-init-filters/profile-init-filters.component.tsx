import { memo } from "react";
import { IProfileInitFiltersProps } from "../../model/interfaces/profile-init-filters.interface";
import { GamesFilter } from "@/entities/game/ui/games-filter";

export const ProfileInitFilters = memo((props: IProfileInitFiltersProps) => {
    const {
        availableGames,
        selectedGames,
        onGamesChange,
        searchQuery,
        onSearchChange
    } = props;

    return (
        <div className="gap-4 bg-zinc-800 p-4 md:p-4 rounded-xl">
            <GamesFilter
                availableGames={availableGames}
                selectedGames={selectedGames}
                onGamesChange={onGamesChange}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
            />
        </div>
    )
})