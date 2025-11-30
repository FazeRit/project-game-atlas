import { ICustomItemsListProps } from "./interfaces";
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, Command } from "../ui/command";
import { Check } from "lucide-react";

export function CustomItemsSelect(props: ICustomItemsListProps) {
    const {
        items,
        onValueSelected,
        selectedValues,
        searchPlaceholder,
        searchQuery,
        onSearchChange,
    } = props;

    const isExternalSearch = typeof onSearchChange === 'function';

    return (
        <Command shouldFilter={!isExternalSearch}>
            <CommandInput 
                placeholder={searchPlaceholder} 
                value={searchQuery}
                onValueChange={onSearchChange}
            />

            <CommandList>
                <CommandEmpty>
                    Нічого не знайдено.
                </CommandEmpty>

                <CommandGroup>
                    {items.map((item) => {
                        const isSelected = selectedValues.includes(item.value);

                        return (
                            <CommandItem
                                key={item.value}
                                value={item.label}
                                onSelect={() => {
                                    onValueSelected(item.value);
                                }}
                            >
                                <div className={`mr-2 flex h-4 w-4 items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                                    <Check className="w-4 h-4" /> 
                                </div>
                                {item.label}
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}