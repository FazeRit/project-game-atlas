import { memo, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ESortOrder } from "@/shared";
import { CustomPagination } from "@/shared/components";
import { useDebounce } from "@uidotdev/usehooks";
import { EPersonalLibraryGameSortField } from "../../model/enums";
import { getPersonalLibraryGamesRequestSchema, IGetPersonalLibraryGamesRequestDto, useGetPersonalLibraryGames } from "../../model";
import { PersonalLibraryListEmpty } from "../personal-library-game-list-empty";
import { PersonalLibraryGameItem } from "../personal-library-game-item";
import { useGetGenres } from "@/entities/genre/model/hooks";
import { PersonalLibraryGameListFilters } from "../personal-library-game-list-filters";
import { getKeywordsRequestSchema } from "@/entities/keyword/model/schemas";
import { useGetKeywords } from "@/entities/keyword";
import { IGetKeywordsRequestDto } from "@/entities/keyword/model/interfaces/get-keywords.interface";

export const PersonalLibraryGameList = memo(() => {
    const personalLibraryGamesMethods = useForm({
        resolver: zodResolver(getPersonalLibraryGamesRequestSchema),
        defaultValues: {
            page: 1,
            limit: 12,
            keywords: [],
            genres: [],
            searchQuery: '',
            sort: `${EPersonalLibraryGameSortField.CREATED_AT}:${ESortOrder.ASC}` as const
        }
    });
    
    const keywordsMethods = useForm ({
        resolver: zodResolver(getKeywordsRequestSchema),
        defaultValues: {
            page: 1,
            limit: 50,
        }
    })

    const personaLibraryGamesFormValues = personalLibraryGamesMethods.watch();
    const keywordsFormValues = keywordsMethods.watch();
    
    const personaLibraryGamesDebouncedFormValues = useDebounce(personaLibraryGamesFormValues, 500);

    const { data: games } = useGetPersonalLibraryGames(personaLibraryGamesDebouncedFormValues as IGetPersonalLibraryGamesRequestDto);
    
    const { data: keywords } = useGetKeywords(keywordsFormValues as IGetKeywordsRequestDto);

    const { data: genres } = useGetGenres();

    const selectedGenres = personaLibraryGamesFormValues.genres ?? [];

    const selectedKeywords = personaLibraryGamesFormValues.keywords ?? [];

    const handleGenresChange = (newValues: Array<string>) => {
        personalLibraryGamesMethods.setValue('genres', newValues, {
            shouldValidate: false,
            shouldDirty: true
        });

        personalLibraryGamesMethods.setValue('page', 1);
    };

    const handleKeywordsChange = (newValues: Array<string>) => {
        personalLibraryGamesMethods.setValue('keywords', newValues, {
            shouldValidate: false,
            shouldDirty: true
        });

        personalLibraryGamesMethods.setValue('page', 1);
    };

    const setPage = (pageNumber: number) => {
        personalLibraryGamesMethods.setValue('page', pageNumber, {
            shouldValidate: false,
            shouldDirty: true
        });
    };

    const currentPage = personaLibraryGamesFormValues.page;
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
        <FormProvider {...personalLibraryGamesMethods}>
            <div className="flex flex-col gap-4 md:gap-8 w-full">
                <PersonalLibraryGameListFilters
                    availableGenres={availableGenres}
                    selectedGenres={selectedGenres}
                    onGenresChange={handleGenresChange}
                    availableKeywords={availableKeywords}
                    selectedKeywords={selectedKeywords}
                    onKeywordsChange={handleKeywordsChange}
                />

                {(!games || games.data.length === 0) ? (
                    <div className="flex justify-center items-center w-full min-h-[400px]">
                        <PersonalLibraryListEmpty />
                    </div>
                ) : (
                    <>
                        <div className="gap-2 gap-y-4 md:gap-6 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                            {games.data.map(item => (
                                <PersonalLibraryGameItem
                                    key={item.checksum}
                                    personalLibraryGame={item}
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