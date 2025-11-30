import { memo } from "react"
import { IGenresFiltersProps } from "../../model"
import { CustomCombobox } from "@/shared/components/custom-combobox"

export const GenresFilter  = memo((props: IGenresFiltersProps) => {
    const {
        availableGenres,
        selectedGenres,
        onGenresChange
    } = props;

    return (
        <CustomCombobox
            items={availableGenres}
            selectedValues={selectedGenres}
            onValuesSelected={onGenresChange}
            triggerPlaceholder="Вибрати жанри"
        />
    )
})