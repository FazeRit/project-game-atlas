import { memo, useCallback } from "react"
import { IGamesFiltersProps } from "../../model/interfaces/games-filters.interface";
import { CustomPopover } from "@/shared/components/custom-popover";

export const GamesFilter = memo((props: IGamesFiltersProps) => {
    const {
        availableGames,
        selectedGames,
        onGamesChange,
        searchQuery,
        onSearchChange
    } = props;

    const handleToggleGame = useCallback((value: string) => {
        const isSelected = selectedGames.includes(value);
        
        const newSelection = isSelected
            ? selectedGames.filter((id) => id !== value)
            : [...selectedGames, value];

        onGamesChange(newSelection);
    }, [selectedGames, onGamesChange]);

    return (
        <CustomPopover
            triggerLabel="Введіть улюблені ігри"
            searchPlaceholder="Пошук гри..."
            items={availableGames}
            selectedValues={selectedGames}
            onValueSelected={handleToggleGame}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            className="w-full"
        />
    )
})