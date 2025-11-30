import { TCustomComboboxItem } from "../../custom-combobox/types";

export interface ICustomItemsListProps {
    items: Array<TCustomComboboxItem>;
    onValueSelected: (value: string) => void 
    selectedValues: Array<string>;
    searchPlaceholder: string
}