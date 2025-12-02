import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { IPaginateGameItemProps } from "@/features/catalog/get-catalog-games";
import { AspectRatio, CustomBadge } from "@/shared/components";
import { transformCoverUrl } from "@/shared/utils/transform-cover-url.util";

export const PaginateGameItem = memo((props: IPaginateGameItemProps) => {
    const {
        game,
        to
    } = props;

    const navigate = useNavigate();

    const coverUrl = useMemo(() => {
        const coverUrl = game?.cover?.url ?? null; 

        return transformCoverUrl(coverUrl);
    }, [game.cover?.url]);

    const uniqueGenres = useMemo(() => {
        const genresMap = new Map();

        game.genres.forEach(item => {
            if (!genresMap.has(item.name)) {
                genresMap.set(item.name, item);
            }
        });

        return Array.from(genresMap.values());
    }, [game.genres]);
    
    const handleGameClick = useCallback(() => {
        navigate(to);
    }, [game.checksum, navigate]);

    return (
        <div
            onClick={handleGameClick}
            className={clsx(
                "flex flex-col pt-4 rounded-xl overflow-hidden cursor-pointer",
                "bg-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-full"
            )}
        >
            <div className="relative w-full min-h-[192px] max-h-[192px] overflow-hidden">
                <AspectRatio ratio={2 / 3} className="w-full overflow-hidden">
                    <img
                        className="z-10 relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={coverUrl}
                        loading="lazy"
                        decoding="async"
                        alt={`Обкладинка гри ${game.name}`}
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/260x192/404040/FFFFFF?text=Error';
                        }}
                    />
                </AspectRatio>
            </div>

            <div className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 w-full h-full">
                <p className="font-semibold text-[14px] text-white md:text-lg truncate">
                    {game.name}
                </p>
                <div className="flex flex-col flex-grow justify-between gap-2">
                    <div className="flex flex-wrap gap-x-2 gap-y-1 overflow-hidden">
                        {uniqueGenres.map(item => (
                            <CustomBadge
                                key={item.name}
                                name={item.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});