import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/shared/components/ui/empty";
import { memo } from "react";

export const PersonalLibraryListEmpty = memo(() => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle
                    className="text-white"
                >
                    Ігор не знайдено
                </EmptyTitle>
            </EmptyHeader>
            <EmptyDescription>
                Спробуйте змінити критерії пошуку, фільтри або додайте гру до персональної бібліотеки.
            </EmptyDescription>
        </Empty>
    )   
})