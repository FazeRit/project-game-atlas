import { Input } from "@/shared/components/ui/input";
import { FormField, FormItem, FormControl } from "@/shared/components/ui/form/form.component";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { GenresFilter } from "@/entities/genre";
import { ICatalogListFiltersProps } from "../../model/interfaces/catalog-list-filters.interface";
import { KeywordsFilter } from "@/entities/keyword";

export const CatalogListFilters = memo((props: ICatalogListFiltersProps) => {
    const {
        availableGenres,
        selectedGenres,
        onGenresChange,
        availableKeywords,
        selectedKeywords,
        onKeywordsChange,
    } = props;

    const { control } = useFormContext();

    return (
        <div
            className="gap-4 grid grid-cols-1 md:grid-cols-4 bg-zinc-800 p-4 md:p-4 rounded-xl"
        >
            <FormField
                control={control}
                name="searchQuery"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormControl>
                            <Input
                                className="w-full"
                                placeholder="Пошук за назвою..."
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <GenresFilter
                availableGenres={availableGenres}
                selectedGenres={selectedGenres}
                onGenresChange={onGenresChange}
            />

            <KeywordsFilter
                availableKeywords={availableKeywords}
                selectedKeywords={selectedKeywords}
                onKeywordsChange={onKeywordsChange}
            />
        </div>
    )
})