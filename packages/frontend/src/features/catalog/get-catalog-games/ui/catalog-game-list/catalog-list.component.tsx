import { memo, useMemo } from "react";
import { getCatalogGamesRequestSchema, IGetCatalogGamesRequestDto, useGetCatalogGames } from "../../model";
import { CatalogListEmpty } from "../catalog-list-empty";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ECatalogGameSortField } from "../../model/enums/get-catalog-games.enums";
import { ESortOrder } from "@/shared";
import { CustomPagination } from "@/shared/components";
import { CatalogListFilters } from "../catalog-list-filters";
import { useDebounce } from "@uidotdev/usehooks";
import { useGetGenres } from "@/entities/genre/model/hooks";
import { useGetKeywords } from "@/entities/keyword/model/hooks";
import { getKeywordsRequestSchema } from "@/entities/keyword/model/schemas";
import { IGetKeywordsRequestDto } from "@/entities/keyword/model/interfaces/get-keywords.interface";
import { PaginateGameItem } from "@/entities/game/ui";

export const CatalogList = memo(() => {
    const catalogMethods = useForm({
        resolver: zodResolver(getCatalogGamesRequestSchema),
        defaultValues: {
            page: 1,
            limit: 12,
            keywords: [],
            genres: [],
            searchQuery: '',
            sort: `${ECatalogGameSortField.CREATED_AT}:${ESortOrder.ASC}` as const
        }
    });

    const keywordsMethods = useForm ({
        resolver: zodResolver(getKeywordsRequestSchema),
        defaultValues: {
            page: 1,
            limit: 50,
        }
    })

    const catalogFormValues = catalogMethods.watch();
    const keywordsFormValues = keywordsMethods.watch();

    const debouncedCatalogFormValues = useDebounce(catalogFormValues, 500);

    const { data: games } = useGetCatalogGames(debouncedCatalogFormValues as IGetCatalogGamesRequestDto);

    const { data: keywords } = useGetKeywords(keywordsFormValues as IGetKeywordsRequestDto);
    
    const { data: genres } = useGetGenres();

    const selectedGenres = catalogFormValues.genres ?? [];

    const selectedKeywords = catalogFormValues.keywords ?? [];

    const handleGenresChange = (newValues: Array<string>) => {
        catalogMethods.setValue('genres', newValues, {
            shouldValidate: false,
            shouldDirty: true
        });

        catalogMethods.setValue('page', 1);
    };

    const handleKeywordsChange = (newValues: Array<string>) => {
        catalogMethods.setValue('keywords', newValues, {
            shouldValidate: false,
            shouldDirty: true
        });

        catalogMethods.setValue('page', 1);
    };

    const setPage = (pageNumber: number) => {
        catalogMethods.setValue('page', pageNumber, {
            shouldValidate: false,
            shouldDirty: true
        });
    };

    const currentPage = catalogFormValues.page;
    const totalPages = games?.meta?.totalPages || 1;

    const availableGenres = useMemo(() => {
        return genres?.data.map(genre => ({
            value: genre.slug,
            label: genre.name,
        })) ?? [];
    }, [genres]);

    const availableKeywords = useMemo(() => {
        return keywords?.data.map(genre => ({
            value: genre.slug,
            label: genre.name,
        })) ?? [];
    }, [keywords]);

    return (
        <FormProvider {...catalogMethods}>
            <div className="flex flex-col gap-4 md:gap-8 w-full">
                <CatalogListFilters
                    availableGenres={availableGenres}
                    selectedGenres={selectedGenres}
                    onGenresChange={handleGenresChange}
                    availableKeywords={availableKeywords}
                    selectedKeywords={selectedKeywords}
                    onKeywordsChange={handleKeywordsChange}
                />

                {(!games || games.data.length === 0) ? (
                    <div className="flex justify-center items-center w-full min-h-[400px]">
                        <CatalogListEmpty />
                    </div>
                ) : (
                    <>
                        <div className="gap-2 gap-y-4 md:gap-6 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                            {games.data.map(item => (
                                <PaginateGameItem
                                    key={item.checksum}
                                    game={item}
                                />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center">
                                <CustomPagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    setPage={setPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </FormProvider>
    )
})