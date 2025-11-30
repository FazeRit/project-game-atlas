import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/shared/components/ui/empty";
import { memo } from "react";

export const CatalogListGameEmpty = memo(() => {
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
                Спробуйте змінити критерії пошуку або фільтри.
            </EmptyDescription>
        </Empty>
    )   
})