import { ICustomItemsListProps } from "./interfaces";
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, Command } from "../ui/command";

export function CustomItemsSelect(props: ICustomItemsListProps) {
    const {
        items,
        onValueSelected,
        selectedValues,
        searchPlaceholder,
    } = props;

    return (
        <Command>
            <CommandInput placeholder={searchPlaceholder} />

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
                                <span
                                    className={`mr-2 h-4 w-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    ✔
                                </span>
                                {item.label}
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}