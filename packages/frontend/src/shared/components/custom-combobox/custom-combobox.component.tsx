import { memo, useCallback, useMemo, useState } from "react";
import { ICustomComboboxProps } from "./interfaces";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CustomItemsSelect } from "../custom-items-select";
import { Button, Drawer, DrawerContent, DrawerTrigger } from "../ui";

export const CustomCombobox = memo((props: ICustomComboboxProps) => {
    const {
        items,
        selectedValues,
        onValuesSelected,
        triggerPlaceholder
    } = props;

    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleSelect = useCallback((value: string) => {
        let newSelectedValues: Array<string> = [];

        if (selectedValues.includes(value)) {
            newSelectedValues = selectedValues.filter((v) => v !== value);
        } else {
            newSelectedValues = [
                ...selectedValues,
                value
            ];
        }

        onValuesSelected(newSelectedValues);
    }, [selectedValues, onValuesSelected]);

    const buttonText = useMemo(() => {
        if (selectedValues.length === 0) {
            return triggerPlaceholder;
        }

        if (selectedValues.length === 1) {
            return items.find(item => item.value === selectedValues[0])?.label ?? triggerPlaceholder;
        }

        return `Вибрано: ${selectedValues.length}`;

    }, [selectedValues, items, triggerPlaceholder]);

    const listComponent = (
        <CustomItemsSelect
            items={items}
            onValueSelected={handleSelect}
            selectedValues={selectedValues}
            searchPlaceholder="Пошук елементів..."
        />
    );


    if (isDesktop) {
        return (
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant="lightgray"
                        className="justify-start w-full truncate">
                        {buttonText}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-100 p-4" align="start">
                    {listComponent}
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
        >
            <DrawerTrigger asChild>
                <Button
                    variant="lightgray"
                    className="justify-start w-full truncate"
                >
                    {buttonText}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    {listComponent}
                </div>
            </DrawerContent>
        </Drawer>
    )
})