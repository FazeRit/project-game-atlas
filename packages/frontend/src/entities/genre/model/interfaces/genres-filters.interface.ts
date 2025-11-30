import { TCustomComboboxItem } from "@/shared/components/custom-combobox/types";

export interface IGenresFiltersProps {
    availableGenres: Array<TCustomComboboxItem>;
    selectedGenres: Array<string>;
    onGenresChange: (values: Array<string>) => void;
}