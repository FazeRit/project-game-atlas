import { TCustomComboboxItem } from "@/shared/components/custom-combobox/types";

export interface IGamesFiltersProps {
    availableGames: Array<TCustomComboboxItem>;
    selectedGames: Array<string>;
    onGamesChange: (values: Array<string>) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}