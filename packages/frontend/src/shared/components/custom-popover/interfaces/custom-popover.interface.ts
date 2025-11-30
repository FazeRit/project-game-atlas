import { TSearchableSelectOption } from "../types";

export interface ISearchablePopoverSelectProps {
    triggerLabel?: string;
    items: Array<TSearchableSelectOption>;
    selectedValues: Array<string>;
    onValueSelected: (value: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    searchPlaceholder?: string;
    isLoading?: boolean;
    className?: string;
}