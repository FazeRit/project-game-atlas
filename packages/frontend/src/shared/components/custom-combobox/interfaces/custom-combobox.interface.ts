import { TCustomComboboxItem } from "../types";

export interface ICustomComboboxProps {
    items: Array<TCustomComboboxItem>;
    selectedValues: Array<string>;
    onValuesSelected: (values: Array<string>) => void;
    triggerPlaceholder: string;
}