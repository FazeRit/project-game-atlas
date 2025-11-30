import { TCustomComboboxItem } from "@/shared/components/custom-combobox/types";

export interface IKeywordsFiltersProps {
    availableKeywords: Array<TCustomComboboxItem>;
    selectedKeywords: Array<string>;
    onKeywordsChange: (values: Array<string>) => void;
}