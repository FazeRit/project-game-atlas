import { memo, useMemo } from "react";
import clsx from "clsx";
import { GenreBadge } from "@/entities/genre/ui";
import { IPersonalLibraryGameItemProps } from "../../model";

export const PersonalLibraryGameItem = memo((props: IPersonalLibraryGameItemProps) => {
    const {
        personalLibraryGame
    } = props;

    const coverUrl = useMemo(() => {
        return personalLibraryGame.game.cover?.url ||
            'https://placehold.co/260x192/404040/FFFFFF?text=No+Cover';
    }, [personalLibraryGame.game.cover?.url]);

    const uniqueGenres = useMemo(() => {
        const genresMap = new Map();

        personalLibraryGame.game.genres.forEach(item => {
            if (!genresMap.has(item.name)) {
                genresMap.set(item.name, item);
            }
        });

        return Array.from(genresMap.values());
    }, [personalLibraryGame.game.genres])

    return (
        <div
            className={clsx(
                "flex flex-col rounded-xl overflow-hidden",
                "bg-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-full"
            )}
        >
            <div className="relative w-full min-h-[192px] max-h-[192px] overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={coverUrl}
                    alt={`Обкладинка гри ${personalLibraryGame.game.name}`}
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/260x192/404040/FFFFFF?text=Error';
                    }}
                />
            </div>

            <div className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 w-full h-full">
                <p className="font-semibold text-[14px] text-white md:text-lg truncate">
                    {personalLibraryGame.game.name}
                </p>
                <div className="flex flex-col flex-grow justify-between gap-2">
                    <div className="flex flex-wrap gap-x-2 gap-y-1 overflow-hidden">
                        {uniqueGenres.map(item => (
                            <GenreBadge
                                key={item.name}
                                genreName={item.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});