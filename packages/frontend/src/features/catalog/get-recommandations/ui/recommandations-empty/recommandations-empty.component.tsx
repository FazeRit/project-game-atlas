import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/shared/components/ui/empty";
import { memo } from "react";

export const RecommandationsEmpty = memo(() => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle
                    className="text-white"
                >
                    Наразі немає нових рекомендацій
                </EmptyTitle>
            </EmptyHeader>
            <EmptyDescription>
                Щоб отримати персоналізовані рекомендації, спробуйте додати більше ігор до Вашої бібліотеки, оцінити їх або пограти в нові жанри.
            </EmptyDescription>
        </Empty>
    )   
})