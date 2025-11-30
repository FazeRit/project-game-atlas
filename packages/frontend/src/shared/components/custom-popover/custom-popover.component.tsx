import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CustomItemsSelect } from "../custom-items-select";
import { Button } from "../ui";
import { ISearchablePopoverSelectProps } from "./interfaces";

export const CustomPopover = (props: ISearchablePopoverSelectProps) => {
    const {
        triggerLabel = "Виберіть...",
        items,
        selectedValues,
        onValueSelected,
        searchQuery,
        onSearchChange,
        searchPlaceholder = "Пошук...",
        className
    } = props;

    const [open, setOpen] = React.useState(false);

    const buttonText = React.useMemo(() => {
        if (selectedValues.length === 0) return triggerLabel;

        if (selectedValues.length === 1) {
            const selectedItem = items.find(i => i.value === selectedValues[0]);
            return selectedItem ? selectedItem.label : `${triggerLabel} (1)`;
        }

        return `${triggerLabel} (${selectedValues.length})`;
    }, [selectedValues, items, triggerLabel]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="lightgray"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("justify-between w-full font-normal", className)}
                >
                    <span className="truncate">
                        {buttonText}
                    </span>
                    <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            
            <PopoverContent className="z-50 p-0 pt-6 w-full" align="start">
                <CustomItemsSelect
                    items={items}
                    selectedValues={selectedValues}
                    onValueSelected={onValueSelected}
                    searchPlaceholder={searchPlaceholder}
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                />
            </PopoverContent>
        </Popover>
    );
};