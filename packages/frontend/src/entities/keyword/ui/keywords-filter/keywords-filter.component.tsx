import { memo } from "react"
import { CustomCombobox } from "@/shared/components/custom-combobox"
import { IKeywordsFiltersProps } from "../../model";

export const KeywordsFilter  = memo((props: IKeywordsFiltersProps) => {
    const {
        availableKeywords,
        selectedKeywords,
        onKeywordsChange,
    } = props;

    return (
        <CustomCombobox
            items={availableKeywords} 
            selectedValues={selectedKeywords}
            onValuesSelected={onKeywordsChange}
            triggerPlaceholder="Вибрати ключові слова"
        />
    )
})